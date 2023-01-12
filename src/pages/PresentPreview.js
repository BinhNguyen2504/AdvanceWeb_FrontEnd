/* eslint-disable no-underscore-dangle */
import { Button, Carousel, Dropdown, Form, Input, notification, Space } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import MainLayout from '../layouts/MainLayout';
import SlicePreview from '../components/SlidePreview';
import { useAddCollaboratorMutation, useDeletePresentMutation, useGetPresentQuery } from '../app/presentationService';
import { useCreateGameMutation } from '../app/gameService';
import { initGame } from '../app/gameSlice';
import { startEditPresent } from '../app/presentationSlice';
import { openNotification } from '../utils';

const PresentPreview = () => {
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createGame] = useCreateGameMutation();
  const [deletePresent] = useDeletePresentMutation();
  const [addCollaborator] = useAddCollaboratorMutation();

  const { data, isLoading } = useGetPresentQuery(id, {
    skip: !id
  });
  const handleCreateGame = async () => {
    const result = await createGame({ presentationId: id }).unwrap();
    if (result) {
      const { roomId, presentation } = result.data;
      await dispatch(
        initGame({
          pin: roomId,
          name: presentation.name,
          questions: presentation.questions,
          numberOfQuestion: presentation.numberOfQuestion
        })
      );
      navigate('/host/waiting', { state: { game: result.data } });
    }
  };
  const handleDeletePresentation = async () => {
    const result = await deletePresent({ id });
    if (result) {
      navigate('/presentation');
    }
  };

  const handlePublicPresent = () => {
    // flow nhu cu
    handleCreateGame();
  };

  const handleGroupPresent = (presentid) => {
    navigate(`/presentation/group/${presentid}`);
  };

  const handleMenuClick = (e) => {
    if (e.key === '1') {
      handlePublicPresent();
    } else {
      handleGroupPresent(id);
    }
  };

  const handleSubmitInvite = async (values) => {
    await addCollaborator({ presentid: id, collaborator: values.username });
    openNotification(api, 'Add user successfully', '', <SmileOutlined style={{ color: '#108ee9' }} />);
  };

  const items = [
    {
      label: 'Public',
      key: '1'
    },
    {
      label: 'Group Only',
      key: '2'
    }
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick
  };

  return (
    <MainLayout>
      {contextHolder}
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <section className='courses container'>
          <p className='btn'>{data.data.name}</p>
          <Form name='invite' onFinish={handleSubmitInvite} style={{ marginBottom: '30px' }}>
            <Form.Item label='Username' name='username'>
              <Input type='text' placeholder='Search by username' />
            </Form.Item>
          </Form>
          <p>Co-owner: </p>
          {data.data.collaborators.map((item) => (
            <p>{item.name}</p>
          ))}
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
          {/* <Button type='primary' className='btn' onClick={handleCreateGame}>
            Start presentation
          </Button> */}
          <Dropdown menu={menuProps}>
            {/* <Button type='primary' className='btn' onClick={handleCreateGame}> */}
            <Button type='primary' className='btn'>
              <Space>
                Start presentation
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </section>
      )}
    </MainLayout>
  );
};
export default PresentPreview;
