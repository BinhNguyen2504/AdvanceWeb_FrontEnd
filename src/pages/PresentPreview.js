import { Button, Carousel } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetPresentQuery } from '../app/presentationService';

import MainLayout from '../layouts/MainLayout';
import SlicePreview from '../components/SlidePreview';
import { useCreateGameMutation } from '../app/gameService';

const PresentPreview = () => {
  const { id } = useParams();
  const [createGame, createGameResult] = useCreateGameMutation();
  const { data, isLoading } = useGetPresentQuery(id, {
    skip: !id
  });
  const handleCreateGame = async () => {
    const result = await createGame({ presentationId: id }).unwrap();
    if (result) {
      console.log(result);
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
          <Button type='primary' htmlType='submit' className='btn'>
            <Link to='/'>Update presentation</Link>
          </Button>
          <Button type='primary' htmlType='submit' className='btn' onClick={handleCreateGame}>
            Start presentation
          </Button>
        </section>
      )}
    </MainLayout>
  );
};
export default PresentPreview;
