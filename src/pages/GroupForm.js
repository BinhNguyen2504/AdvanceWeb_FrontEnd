import { SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, notification } from 'antd';
import { useCreateGroupMutation } from '../app/groupService';

import MainLayout from '../layouts/MainLayout';
import { openNotification } from '../utils';

const { Content } = Layout;

const GroupForm = () => {
  const [createGroup] = useCreateGroupMutation();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const result = await createGroup(values).unwrap();
    if (!result.error) {
      form.resetFields();
      openNotification(api, 'Create group successfully', result.error, <SmileOutlined style={{ color: '#108ee9' }} />);
    }
  };

  return (
    <Content>
      <MainLayout>
        {contextHolder}
        <section className='form-container container'>
          <Form form={form} name='login' layout='vertical' onFinish={onFinish} autoComplete='off'>
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
