import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useState } from 'react';
import { useForgotPasswordMutation } from '../app/authService';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import BasicLayout from '../layouts/BasicLayout';
import { openNotification } from '../utils';

const ForgotPasswordPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const { isLoading } = forgotPasswordResult;

  const onFinish = async (values) => {
    const result = await forgotPassword(values).unwrap();
    if (result.error) {
      openNotification(api, 'Can not find your account', result.error, <SmileOutlined style={{ color: '#108ee9' }} />);
    }
    if (!result.error) {
      setIsSuccess(true);
    }
  };

  return (
    <BasicLayout>
      {contextHolder}
      {isSuccess ? (
        <section className='form-container'>
          <h3>Please check your emails for a message with your activation link</h3>
        </section>
      ) : (
        <ForgotPasswordForm onFinish={onFinish} isLoading={isLoading} />
      )}
    </BasicLayout>
  );
};

export default ForgotPasswordPage;
