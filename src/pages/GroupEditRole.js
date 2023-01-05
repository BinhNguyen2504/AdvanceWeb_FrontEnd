import { SmileOutlined } from '@ant-design/icons';
import { Button, Form, Layout, notification, Select, Typography } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../constants';

import MainLayout from '../layouts/MainLayout';
import { openNotification } from '../utils';

const { Content } = Layout;

const EditRole = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const assignCoOwnerAPI = async (groupID, name) => {
    const { data } = await API.put('/group/assigncoowner', {
      groupId: groupID,
      coOwner: name
    });
    return data;
  };

  const unassignCoOwnerAPI = async (groupID, name) => {
    const { data } = await API.put('/group/unassigncoowner', {
      groupId: groupID,
      coOwner: name
    });
    return data;
  };

  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const { state } = useLocation();
  const { member } = state;
  const { role } = state;
  const { groupID } = state;

  console.log('member:  ', member);
  console.log('state: ', state);
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
    }
    // {
    //   value: 'owner',
    //   label: 'owner'
    // }
  ];
  const handleSubmit = async (values) => {
    console.log(values);
    if (values.role === role) {
      openNotification(api, `You are currently a ${role}`, <SmileOutlined style={{ color: '#108ee9' }} />);
      console.log('role now: ', role);
      return;
    }
    if (values.role === 'member') {
      const res = await unassignCoOwnerAPI(groupID, member.name);
      if (res.success) {
        openNotification(api, 'Update role successfully', <SmileOutlined style={{ color: '#108ee9' }} />);
      } else {
        openNotification(api, 'Update role fail', <SmileOutlined style={{ color: '#108ee9' }} />);
      }
    } else {
      const res = await assignCoOwnerAPI(groupID, member.name);
      if (res.success) {
        openNotification(api, 'Update role successfully', <SmileOutlined style={{ color: '#108ee9' }} />);
      } else {
        openNotification(api, 'Update role fail', <SmileOutlined style={{ color: '#108ee9' }} />);
      }
    }
  };

  return (
    <Content>
      <MainLayout>
        {contextHolder}
        <section className='container form-container'>
          <Form form={form} name='login' layout='vertical' onFinish={handleSubmit} autoComplete='off'>
            <h3>Edit Role</h3>
            <Typography.Title type='success' level={3}>
              {member.name}
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
