import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element, path }) => {
  const { id } = useSelector((state) => state.auth);
  if (id) {
    return <Route element={element} path={path} />;
  }
  return <Navigate to='/login' />;
};

export default ProtectedRoute;
