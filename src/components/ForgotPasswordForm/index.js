import { Button, Form, Input, Spin } from 'antd';

const ForgotPasswordForm = ({ onFinish, isLoading = 'false' }) => (
  <section className='form-container'>
    <Form name='login' layout='vertical' onFinish={onFinish} autoComplete='off'>
      <h3>Find Your Account</h3>
      <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email address!' }]}>
        <Input placeholder='Type your email here' type='text' required className='box' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn'>
          {isLoading ? <Spin /> : 'Search'}
        </Button>
      </Form.Item>
    </Form>
  </section>
);

export default ForgotPasswordForm;
