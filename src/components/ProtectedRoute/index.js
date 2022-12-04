import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const { id } = useSelector((state) => state.auth);

  if (id) {
    return children || <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
