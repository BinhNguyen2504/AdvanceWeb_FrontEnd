import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../app/authService';
import { loginUser } from '../app/authSlice';
import LoginForm from '../components/LoginForm';
import MainLayout from '../layouts/MainLayout';
import setAuthHeader from '../utils';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, loginResult] = useLoginMutation();
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) navigate('/');
  }, [id]);
  const { isLoading } = loginResult;
  const onFinish = async (values) => {
    const result = await login(values).unwrap();
    if (result) {
      const { email, username, _id } = result.data.user;
      setAuthHeader(result.data.token);
      localStorage.setItem('token', result.data.token);
      await dispatch(loginUser({ email, username, id: _id }));
      navigate('/');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} isLoading={isLoading} />
    </MainLayout>
  );
};

export default LoginPage;
