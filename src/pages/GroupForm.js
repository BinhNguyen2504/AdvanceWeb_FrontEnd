import { Button, Form, Input, Layout } from 'antd';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupForm = () => {
  const onFinish = async (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content>
      <MainLayout>
        <section className='form-container'>
          <Form name='login' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <h3>Create new group</h3>
            <Form.Item
              label='Group name'
              name='name'
              rules={[{ required: true, message: 'Please input your email address!' }]}
            >
              <Input placeholder='Enter your name group' type='text' required className='box' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='btn'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </section>
      </MainLayout>
    </Content>
  );
};

export default GroupForm;
