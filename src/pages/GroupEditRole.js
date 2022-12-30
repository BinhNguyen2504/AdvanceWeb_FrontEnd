import { Button, Form, Layout, notification, Select, Typography } from 'antd';

import MainLayout from '../layouts/MainLayout';

const { Content } = Layout;

const EditRole = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const roles = [
    {
      value: 'member',
      label: 'member'
    },
    {
      value: 'co-owner',
      label: 'co-owner'
    },
    {
      value: 'disabled',
      disabled: true,
      label: 'Disabled'
    },
    {
      value: 'owner',
      label: 'owner'
    }
  ];
  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Content>
      <MainLayout>
        {contextHolder}
        <section className='container form-container'>
          <Form form={form} name='login' layout='vertical' onFinish={handleSubmit} autoComplete='off'>
            <h3>Edit Role</h3>
            <Typography.Title type='success' level={3}>
              Ten someone
            </Typography.Title>
            <Form.Item name='role' label='Role' rules={[{ required: true }]}>
              <Select
                onChange={(value) => {
                  form.setFieldsValue({ role: value });
                }}
                name='role'
                placeholder='Please select a role'
                allowClear
                options={roles}
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='btn'>
                Save
              </Button>
            </Form.Item>
          </Form>
        </section>
      </MainLayout>
    </Content>
  );
};

export default EditRole;
