import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../app/authService';
import ResetPasswordForm from '../components/ResetPasswordForm';
import BasicLayout from '../layouts/BasicLayout';
import { openNotification } from '../utils';

const ResetPasswordPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
  const { token } = useParams();
  const navigate = useNavigate();
  const { isLoading } = resetPasswordResult;

  const onFinish = async (values) => {
    const result = await resetPassword({ password: values.password, token }).unwrap();
    if (result.error) {
      openNotification(api, 'Reset password failed', result.error, <SmileOutlined style={{ color: '#108ee9' }} />);
    }
    if (!result.error) {
      navigate('/login');
    }
  };

  return (
    <BasicLayout>
      {contextHolder}
      <ResetPasswordForm onFinish={onFinish} isLoading={isLoading} />
    </BasicLayout>
  );
};

export default ResetPasswordPage;
