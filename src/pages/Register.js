import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { useSelector } from 'react-redux';
import { SmileOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../app/authService';
import RegisterForm from '../components/RegisterForm';
import MainLayout from '../layouts/MainLayout';
import { openNotification } from '../utils';

const RegisterPage = () => {
  const [register, registerResult] = useRegisterMutation();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) navigate('/dashboard');
  }, [id]);

  // const openNotification = (message, description) => {
  //   api.open({
  //     message: 'Register successfully',
  //     description: 'Please check mail box to verify your account.',
  //     icon: <SmileOutlined style={{ color: '#108ee9' }} />
  //   });
  // };
  const onFinish = async (values) => {
    await register(values).unwrap();
    openNotification(
      api,
      'Register successfully',
      'Please check mail box to verify your account.',
      <SmileOutlined style={{ color: '#108ee9' }} />
    );
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const { isLoading } = registerResult;

  return (
    <MainLayout>
      {contextHolder}
      <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} isLoading={isLoading} />
    </MainLayout>
  );
};
export default RegisterPage;
