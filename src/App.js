import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import setAuthHeader from './utils';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorPage from './pages/404';
import GroupList from './pages/GroupList';
import GroupDetail from './pages/GroupDetail';
import GroupForm from './pages/GroupForm';
import Profile from './pages/Profile';
import ReportSlide from './pages/ReportSlide';

import './variables.css';
import './index.css';
import './App.css';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthHeader(token);
    }
  }, []);

  return (
    <main>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/report' element={<ReportSlide />} />
        <Route path='/groups/:id' element={<GroupDetail />} />
        <Route path='/groups/create' element={<GroupForm />} />
        <Route path='/groups' element={<GroupList />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </main>
  );
};

export default App;
