import { SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, notification } from 'antd';
import { useCreateGroupMutation } from '../app/groupService';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const GroupForm = () => {
  const [createGroup, createGroupResult] = useCreateGroupMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Create group successfully',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    });
  };
  const onFinish = async (values) => {
    console.log(values);
    // const result = await createGroup(values).unwrap();
    // console.log(result);
    // console.log(createGroupResult);
    openNotification();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content>
      <MainLayout>
        {contextHolder}
        <section className='form-container'>
          <Form name='login' layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <h3>Create new group</h3>
            <Form.Item
              label='Group name'
              name='groupName'
              rules={[{ required: true, message: 'Please input group name!' }]}
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
