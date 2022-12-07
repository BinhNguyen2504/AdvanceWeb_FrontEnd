import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useJoinPresentMutation } from '../app/presentationService';
import BasicLayout from '../layouts/BasicLayout';

const JoinGame = () => {
  // const navigate = useNavigate();
  const [joinGame, joinGameResult] = useJoinPresentMutation();
  const { username } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    console.log(values);
    const result = await joinGame(values).unwrap();
    if (result) {
      console.log(result);
      // navigate('/waiting');
    }
  };
  const onFinishFailed = () => {};

  return (
    <BasicLayout>
      <section className='form-container'>
        <Form name='login' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <h1>Please enter the code</h1>
          <Form.Item
            label='Nick name'
            name='username'
            rules={[{ required: true, message: 'Please input your name!' }]}
            initialValue={username}
          >
            <Input placeholder='Enter your name' type='text' required className='box' />
          </Form.Item>
          <Form.Item label='PIN code' name='pin' rules={[{ required: true, message: 'Please input PIN!' }]}>
            <Input placeholder='Enter PIN' type='text' required className='box' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='btn'>
              Submit
            </Button>
          </Form.Item>
          <br />
          <span>The code is found on the screen in front of you</span>
        </Form>
      </section>
    </BasicLayout>
  );
};

export default JoinGame;
