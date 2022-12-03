import { Button, Form, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants';
import './styles.css';

const LoginForm = ({ onFinish, onFinishFailed, isLoading }) => {
  const googleAuth = () => {
    window.open(`${BASE_URL}/user/auth/google`, '_self');
  };

  return (
    <section className='form-container'>
      <Form name='login' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
        <h3>Login to your account</h3>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email address!' }]}>
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
            {isLoading ? <Spin /> : 'Login'}
          </Button>
        </Form.Item>
        <div className='divider'>
          <div className='divider-left' />
          <span>OR</span>
          <div className='divider-right' />
        </div>
        <Form.Item>
          <Button className='btn' onClick={googleAuth}>
            Login with Google
          </Button>
        </Form.Item>
        <div className='divider'>
          <div className='divider-left' />
          <span>OR</span>
          <div className='divider-right' />
        </div>
        <Form.Item>
          <Link to='/signup'>Do not have account</Link>
        </Form.Item>
      </Form>
    </section>
  );
};

export default LoginForm;
