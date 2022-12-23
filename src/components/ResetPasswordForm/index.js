import { Button, Form, Input, Spin } from 'antd';

const ResetPasswordForm = ({ onFinish, isLoading = 'false' }) => (
  <section className='form-container'>
    <Form name='resetpassword' layout='vertical' onFinish={onFinish} autoComplete='off'>
      <h3>Reset your password</h3>
      <Form.Item
        label='New Password'
        name='password'
        rules={[
          { required: true, message: 'Please input new password!' },
          { min: 8, message: 'Password must be at least 8 characters' }
        ]}
      >
        <Input placeholder='Password' type='password' required className='box' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='btn'>
          {isLoading ? <Spin /> : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  </section>
);

export default ResetPasswordForm;
