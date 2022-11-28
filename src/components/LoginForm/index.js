import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useLoginMutation } from '../../app/authService';
import useFetch from '../../hooks/useFetch';
import './styles.css';

const LoginForm = () => {
  const [login, loginResult] = useLoginMutation();
  const { handleGoogle, loading, error } = useFetch('http://localhost:5001/login');
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle
      });

      google.accounts.id.renderButton(document.getElementById('loginDiv'), {
        // type: "standard",
        theme: 'filled_black',
        // size: "small",
        text: 'signin_with',
        shape: 'pill'
      });

      // google.accounts.id.prompt();
    }
  }, [handleGoogle]);

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
          {/* <Button type='primary' htmlType='submit' className='btn'>
            Continue with Google
          </Button> */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? <div>Loading....</div> : <div id='loginDiv' data-text='signin_with' />}
        </Form.Item>
      </Form>
    </section>
  );
};

export default LoginForm;
