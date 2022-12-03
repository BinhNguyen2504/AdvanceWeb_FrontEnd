import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { id } = useSelector((state) => state.auth);
  console.log(id);
  if (id) {
    return children;
  }
  return <Navigate to='/login' replace />;
};

export default ProtectedRoute;
