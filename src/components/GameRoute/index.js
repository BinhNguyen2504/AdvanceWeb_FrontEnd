import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const GameRoute = ({ redirectPath = '/', children }) => {
  const { pin } = useSelector((state) => state.game);
  if (pin) {
    return children || <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default GameRoute;
