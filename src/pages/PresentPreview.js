import { Button, Carousel } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainLayout from '../layouts/MainLayout';
import SlicePreview from '../components/SlidePreview';
import { useDeletePresentMutation, useGetPresentQuery } from '../app/presentationService';
import { useCreateGameMutation } from '../app/gameService';
import { initGame } from '../app/gameSlice';
import { startEditPresent } from '../app/presentationSlice';

const PresentPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createGame] = useCreateGameMutation();
  const [deletePresent] = useDeletePresentMutation();

  const { data, isLoading } = useGetPresentQuery(id, {
    skip: !id
  });
  const handleCreateGame = async () => {
    const result = await createGame({ presentationId: id }).unwrap();
    if (result) {
      const { pin, presentation } = result.data;
      await dispatch(
        initGame({
          pin,
          name: presentation.name,
          questions: presentation.questions,
          numberOfQuestion: presentation.numberOfQuestion
        })
      );
      navigate('/host/waiting');
    }
  };
  const handleDeletePresentation = async () => {
    const result = await deletePresent({ id });
    if (result) {
      console.log(result);
      navigate('/presentation');
    }
  };
  return (
    <MainLayout>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <section className='courses container'>
          <p className='btn'>{data.data.name}</p>
          <Carousel>
            {data.data.questions.map((slide) => (
              <div key={slide._id}>
                <SlicePreview content={slide} />
              </div>
            ))}
          </Carousel>
          <Button type='primary' className='btn' onClick={() => dispatch(startEditPresent(id))}>
            <Link to={`/presentation/edit/${id}`}>Update presentation</Link>
          </Button>
          <Button type='primary' className='btn' onClick={handleDeletePresentation}>
            Delete presentation
          </Button>
          <Button type='primary' className='btn' onClick={handleCreateGame}>
            Start presentation
          </Button>
        </section>
      )}
    </MainLayout>
  );
};
export default PresentPreview;
