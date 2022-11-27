import { useRoutes } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorPage from './pages/404';
import GroupList from './pages/GroupList';
import GroupDetail from './pages/GroupDetail';
import Profile from './pages/Profile';

import './variables.css';
import './index.css';
import './App.css';

const App = () => {
  const pages = useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/profile', element: <Profile /> },
    { path: '/groups/:id', element: <GroupDetail /> },
    { path: '/groups', element: <GroupList /> },
    { path: '*', element: <ErrorPage /> }
  ]);

  return <main>{pages}</main>;
};

export default App;
