// import { SmileOutlined } from '@ant-design/icons';
// import { notification } from 'antd';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const { id } = useSelector((state) => state.auth);
  // const [api, contextHolder] = notification.useNotification();

  // const openNotification = () => {
  //   api.open({
  //     message: 'Register successfully',
  //     description: 'Please check mail box to verify your account.',
  //     icon: <SmileOutlined style={{ color: '#108ee9' }} />
  //   });
  // };

  if (id) {
    return children || <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
