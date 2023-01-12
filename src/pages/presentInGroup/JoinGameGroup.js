import { Button, Form, Input, notification } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
// import { loginAnonymous } from '../../app/authSlice';
// import { initGame } from '../../app/gameSlice';
// import { useJoinPresentMutation } from '../../app/presentationService';
import { useSelector } from 'react-redux';
import { openNotification } from '../../utils';
import BasicLayout from '../../layouts/BasicLayout';
import { getPresentationByroomId } from '../../api/groupAPI';

const JoinGameGroup = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [joinGame] = useJoinPresentMutation();
  const [api, contextHolder] = notification.useNotification();
  const { username } = useSelector((state) => state.auth);
  // const { socket } = useSelector((state) => state.socket);

  const { state } = useLocation();

  const onFinish = async (values) => {
    const { data } = await getPresentationByroomId(state.gameid, username);

    if (data.success) {
      navigate('/presentation/group/player/waiting', {
        state: { player: values, game: data.data, roomID: state.gameid }
      });
    } else {
      openNotification(api, 'Join game fail, please try later', '', <SmileOutlined style={{ color: '#108ee9' }} />);
    }
    // const result = await joinGame(values).unwrap();
    // if (result.success) {
    //   const { name, questions, numberOfQuestion } = result.data;
    //   await dispatch(initGame({ pin: values.pin, name, questions, numberOfQuestion }));
    //   dispatch(loginAnonymous(values.username));
    //   socket.emit('join-room', {
    //     name: values.username,
    //     room: values.pin
    //   });
    //   navigate('/player/waiting');
    // } else {
    //   openNotification(api, result.error, '', <SmileOutlined style={{ color: '#108ee9' }} />);
    // }
  };

  return (
    <BasicLayout>
      {contextHolder}
      <section className='form-container'>
        <Form name='login' layout='vertical' onFinish={onFinish} autoComplete='off'>
          <h1>Please enter the code</h1>
          <Form.Item
            label='Nick name'
            name='username'
            rules={[{ required: false, message: 'Please input your name!' }]}
            initialValue={state.game}
          >
            <Input placeholder={`${username}`} type='text' disabled className='box' />
          </Form.Item>
          {/* <Form.Item label='PIN code' name='pin' rules={[{ required: true, message: 'Please input PIN!' }]}>
            <Input placeholder='Enter PIN' type='text' required className='box' />
          </Form.Item> */}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='btn'>
              Join Game
            </Button>
          </Form.Item>
          <br />
          <span>The code is found on the screen in front of you</span>
        </Form>
      </section>
    </BasicLayout>
  );
};

export default JoinGameGroup;
