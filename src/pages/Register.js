import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '../app/authService';
import RegisterForm from '../components/RegisterForm';
import MainLayout from '../layouts/MainLayout';

const RegisterPage = () => {
  const [register, registerResult] = useRegisterMutation();
  const [api, contextHolder] = notification.useNotification();
  const { isLoading } = registerResult;

  const openNotification = () => {
    api.open({
      message: 'Register successfully',
      description: 'Please check mail box to verify your account.',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />
    });
  };

  const onFinish = async (values) => {
    await register(values).unwrap();
    openNotification();
    console.log(registerResult);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      {contextHolder}
      <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} isLoading={isLoading} />
    </MainLayout>
  );
};
export default RegisterPage;
