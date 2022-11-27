import { Button, Form, Input } from 'antd';
import { useLoginMutation } from '../../app/authService';
import './styles.css';

const LoginForm = () => {
  const [login, loginResult] = useLoginMutation();

  const onFinish = async (values) => {
    console.log('Success:', values);
    await login(values).unwrap();
    console.log(loginResult);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='form-container'>
      <Form name='login' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <h3>Login to your account</h3>
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='Username' type='text' required className='box' />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='Password' type='password' required className='box' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='btn'>
            Submit
          </Button>
        </Form.Item>
        <div className='divider'>
          <div className='divider-left' />
          <span>OR</span>
          <div className='divider-right' />
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='btn'>
            Continue with Google
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default LoginForm;
