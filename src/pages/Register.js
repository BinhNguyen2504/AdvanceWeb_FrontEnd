import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { SmileOutlined } from '@ant-design/icons';

import { useRegisterMutation } from '../app/authService';
import RegisterForm from '../components/RegisterForm';
import { openNotification } from '../utils';
import BasicLayout from '../layouts/BasicLayout';

const RegisterPage = () => {
  const [register, registerResult] = useRegisterMutation();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.auth);
  const { isLoading } = registerResult;
  useEffect(() => {
    if (id) navigate('/dashboard');
  }, [id]);

  const onFinish = async (values) => {
    const result = await register(values).unwrap();
    if (result.error) {
      openNotification(api, 'Register failed', result.error, <SmileOutlined style={{ color: '#108ee9' }} />);
    }
    if (!result.error) {
      openNotification(
        api,
        'Register successfully',
        'Please check mail box to verify your account.',
        <SmileOutlined style={{ color: '#108ee9' }} />
      );
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <BasicLayout>
      {contextHolder}
      <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} isLoading={isLoading} />
    </BasicLayout>
  );
};
export default RegisterPage;
