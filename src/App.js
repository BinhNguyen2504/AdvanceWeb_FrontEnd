import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { setAuthHeader } from './utils';
import { useGetProfileQuery } from './app/profileService';
import { loginUser } from './app/authSlice';
import { createSocket } from './app/socketSlice';

import GameRoute from './components/GameRoute';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ErrorPage from './pages/404';
import GroupList from './pages/GroupList';
import GroupDetail from './pages/GroupDetail';
import GroupForm from './pages/GroupForm';
import Profile from './pages/Profile';
// import ReportSlide from './pages/ReportSlide';
import Dashboard from './pages/Dashboard';
import PresentEdit from './pages/PresentEdit';
import PresentItem from './pages/PresentItem';
import PresentList from './pages/PresentList';
import JoinGame from './pages/JoinGame';
import PlayerWaitingRoom from './pages/PlayerWaitingRoom';
import PresentPreview from './pages/PresentPreview';
import HostWaitingRoom from './pages/HostWaitingRoom';
import HostLiveGame from './pages/HostLiveGame';
import PlayerLiveGame from './pages/PlayerLiveGame';

import './variables.css';
import './index.css';
import './App.css';
import { BASE_URL, SOCKET_URL } from './constants';
import { axiosClient } from './api/client';

const App = () => {
  const user = localStorage.getItem('token');
  const dispatch = useDispatch();
  if (user) {
    setAuthHeader(user);
  }
  const { data, isLoading } = useGetProfileQuery(user, {
    skip: !user
  });

  // ? Load user info
  useEffect(() => {
    async function loadUser() {
      if (data && data.data) {
        const { email, username, _id } = data.data;
        await dispatch(loginUser({ email, username, id: _id }));
      } else {
        const url = `${BASE_URL}/user/login/success`;
        const result = await axiosClient.get(url, { withCredentials: true });
        if (result.data.data !== 'logout success') {
          const { email, username, _id } = result.data.data.user;
          const { token } = result.data.data;
          if (token) {
            setAuthHeader(result.data.data.token);
            localStorage.setItem('token', result.data.data.token);
            await dispatch(loginUser({ email, username, id: _id }));
          }
        } else {
          setAuthHeader(null);
        }
      }
    }
    loadUser();
  }, [isLoading, data]);

  // ? Add connect socket io
  useEffect(() => {
    const socket = io(SOCKET_URL);
    dispatch(createSocket(socket));
    // return () => socket.disconnect();
  }, [dispatch]);

  return (
    <main>
      {isLoading ? (
        <h1>Loading user info...</h1>
      ) : (
        <Routes>
          <Route index element={<JoinGame />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route element={<GameRoute />}>
            <Route path='/player/waiting' element={<PlayerWaitingRoom />} />
            <Route path='/player/live' element={<PlayerLiveGame />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/groups' element={<GroupList />} />
            <Route path='/groups/:id' element={<GroupDetail />} />
            <Route path='/groups/create' element={<GroupForm />} />
            <Route path='/presentation' element={<PresentList />} />
            <Route path='/presentation/create' element={<PresentEdit />} />
            <Route path='/presentation/preview/:id' element={<PresentPreview />} />
            <Route path='/presentation/edit/:id' element={<PresentEdit />} />
            <Route path='/presentation/:id' element={<PresentItem />} />
            <Route path='/host/waiting' element={<HostWaitingRoom />} />
            <Route path='/host/live' element={<HostLiveGame />} />
            {/* <Route path='/report' element={<ReportSlide />} /> */}
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
