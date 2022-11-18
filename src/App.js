import { useRoutes } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ErrorPage from './pages/404';

const App = () => {
  const pages = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '*', element: <ErrorPage /> }
  ]);

  return <main>{pages}</main>;
};

export default App;
