import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import setAuthHeader from './utils';
import { useGetProfileQuery } from './app/profileService';
import { loginUser } from './app/authSlice';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorPage from './pages/404';
import GroupList from './pages/GroupList';
import GroupDetail from './pages/GroupDetail';
import GroupForm from './pages/GroupForm';
import Profile from './pages/Profile';
import ReportSlide from './pages/ReportSlide';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PresentEdit from './pages/PresentEdit';
import PresentItem from './pages/PresentItem';
import PresentList from './pages/PresentList';

import './variables.css';
import './index.css';
import './App.css';

const App = () => {
  const user = localStorage.getItem('token');
  if (user) {
    setAuthHeader(user);
  }
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProfileQuery(user, {
    skip: !user
  });
  useEffect(() => {
    async function loadUser() {
      // console.log('Loading info of user...');
      if (data) {
        const { email, username, _id } = data.data;
        await dispatch(loginUser({ email, username, id: _id }));
      } else {
        setAuthHeader(null);
      }
    }
    loadUser(user);
  }, [isLoading, data]);

  return (
    <main>
      {isLoading ? (
        <h1>Loading user info...</h1>
      ) : (
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/groups' element={<GroupList />} />
            <Route path='/groups/:id' element={<GroupDetail />} />
            <Route path='/groups/create' element={<GroupForm />} />

            <Route path='/presentation' element={<PresentList />} />
            <Route path='/presentation/:id' element={<PresentItem />} />
            <Route path='/presentation/:id/edit' element={<PresentEdit />} />

            <Route path='/report' element={<ReportSlide />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
