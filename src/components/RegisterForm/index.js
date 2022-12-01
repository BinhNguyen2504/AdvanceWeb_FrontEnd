import { Button, Form, Input, notification, Spin } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../../app/authService';
import './styles.css';

const RegisterForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [register, registerResult] = useRegisterMutation();
  const { isLoading } = registerResult;
  const openNotification = () => {
    api.open({
      message: 'Register successfully',
      description: 'Please check mail box to verify your account.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    });
  };
  const onFinish = async (values) => {
    await register(values).unwrap();
    openNotification();
    console.log(registerResult);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='form-container'>
      {contextHolder}
      <Form name='register' autoComplete='off' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <h3>Register now</h3>
        <Form.Item
          label='Your name'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input type='text' placeholder='Enter your name' required className='box' />
        </Form.Item>
        <Form.Item label='Your email' name='email' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input type='email' placeholder='enter your email' required className='box' />
        </Form.Item>
        <Form.Item
          label='Your password'
          name='password'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input.Password type='password' placeholder='enter your password' required className='box' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className='btn'>
            {isLoading ? <Spin /> : 'Register new'}
          </Button>
        </Form.Item>
        <div className='divider'>
          <div className='divider-left' />
          <span>OR</span>
          <div className='divider-right' />
        </div>
      </Form>
    </section>
  );
};
export default RegisterForm;
