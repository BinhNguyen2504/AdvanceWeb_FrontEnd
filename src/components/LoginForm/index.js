import { Button, Form, Input } from 'antd';

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='login'
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item label='Username' name='username' rules={[{ required: false, message: 'Please input your username!' }]}>
        <Input placeholder='Username' />
      </Form.Item>

      <Form.Item label='Password' name='password' rules={[{ required: false, message: 'Please input your password!' }]}>
        <Input.Password placeholder='Password' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
