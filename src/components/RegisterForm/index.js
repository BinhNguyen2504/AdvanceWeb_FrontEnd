import { Button, Form, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';

import './styles.css';

const RegisterForm = ({ onFinish, onFinishFailed, isLoading }) => (
  <section className='form-container'>
    <Form name='register' autoComplete='off' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <h3>Register now</h3>
      <Form.Item label='Your name' name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input type='text' placeholder='Enter your name' required className='box' />
      </Form.Item>
      <Form.Item label='Your email' name='email' rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input type='email' placeholder='enter your email' required className='box' />
      </Form.Item>
      <Form.Item
        label='Your password'
        name='password'
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters' }
        ]}
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
      <Form.Item>
        <Link to='/login'>Already have account</Link>
      </Form.Item>
    </Form>
  </section>
);
export default RegisterForm;
