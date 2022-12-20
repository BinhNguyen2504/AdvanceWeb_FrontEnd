import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../app/authService';
import { loginUser } from '../app/authSlice';
import LoginForm from '../components/LoginForm';
import { BASE_URL } from '../constants';
import BasicLayout from '../layouts/BasicLayout';
import { openNotification, setAuthHeader } from '../utils';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, loginResult] = useLoginMutation();
  const [api, contextHolder] = notification.useNotification();
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) navigate('/dashboard');
  }, [id]);
  const { isLoading } = loginResult;

  const onFinish = async (values) => {
    const result = await login(values).unwrap();
    if (result.error) {
      console.log('Result: ', result);
      openNotification(api, 'Login failed', result.error, <SmileOutlined style={{ color: '#108ee9' }} />);
    }
    if (!result.error) {
      const { email, username, _id } = result.data.user;
      setAuthHeader(result.data.token);
      localStorage.setItem('token', result.data.token);
      await dispatch(loginUser({ email, username, id: _id }));
      navigate('/dashboard');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const googleLogin = () => {
    window.open(`${BASE_URL}/user/auth/google/callback`, '_self');
  };
  return (
    <BasicLayout>
      {contextHolder}
      <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} isLoading={isLoading} googleLogin={googleLogin} />
    </BasicLayout>
  );
};

export default LoginPage;
