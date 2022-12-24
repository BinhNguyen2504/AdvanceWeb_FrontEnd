import { SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, notification } from 'antd';
import { useCreateGroupMutation } from '../../app/groupService';
// import { useCreateGroupMutation } from '../../app/groupService';

import MainLayout from '../../layouts/MainLayout';

const { Content } = Layout;

const CreateGroupPage = () => {
  const [createGroup, createGroupResult] = useCreateGroupMutation();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const openNotification = () => {
    api.open({
      message: 'Create group successfully',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    });
  };
  const handleSubmit = async (values) => {
    console.log(values);
    const result = await createGroup(values).unwrap();
    console.log(result);
    console.log(createGroupResult);
    openNotification();
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content>
      <MainLayout>
        {contextHolder}
        <section className='form-container'>
          <Form
            form={form}
            name='login'
            layout='vertical'
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
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
                Create Group
              </Button>
            </Form.Item>
          </Form>
        </section>
      </MainLayout>
    </Content>
  );
};

export default CreateGroupPage;
