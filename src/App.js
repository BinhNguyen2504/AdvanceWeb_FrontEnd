import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { setAuthHeader } from './utils';
import { BASE_URL, SOCKET_URL } from './constants';
import { useGetProfileQuery } from './app/profileService';
import { loginUser } from './app/authSlice';
import { createSocket } from './app/socketSlice';
import { axiosClient } from './api/client';

import GameRoute from './components/GameRoute';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import ErrorPage from './pages/404';
import GroupList from './pages/GroupList';
import GroupDetail from './pages/GroupDetail';
import EditRole from './pages/GroupEditRole';
import GroupForm from './pages/GroupForm';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import PresentEdit from './pages/PresentEdit';
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

// import GroupDetailPage from './pages/groups/GroupDetailPage2';
// import EditRolePage from './pages/groups/GroupEditRolePage';
import PresentGroupPage from './pages/groups/PresentGroup';
import HostWaitingRoomGroupPage from './pages/presentInGroup/HostWaitingRoomGroup';
import HostLiveGameGroupPage from './pages/presentInGroup/HostLiveGameGroup';
import JoinGameGroup from './pages/presentInGroup/JoinGameGroup';

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
    return () => socket.disconnect();
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
          <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
          <Route path='/resetpassword/:token' element={<ResetPasswordPage />} />
          <Route path='/host/live' element={<HostLiveGame />} />
          <Route element={<GameRoute />}>
            <Route path='/player/waiting' element={<PlayerWaitingRoom />} />
            <Route path='/player/live' element={<PlayerLiveGame />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/groups' element={<GroupList />} />
            <Route path='/groups/:id' element={<GroupDetail />} />
            <Route path='/groups/role/:groupid' element={<EditRole />} />
            <Route path='/groups/create' element={<GroupForm />} />
            <Route path='/presentation' element={<PresentList />} />
            <Route path='/presentation/create' element={<PresentEdit />} />
            <Route path='/presentation/preview/:id' element={<PresentPreview />} />
            <Route path='/presentation/edit/:id' element={<PresentEdit />} />

            <Route path='/host/waiting' element={<HostWaitingRoom />} />

            <Route path='/presentation/group/:presentid' element={<PresentGroupPage />} />
            <Route path='/presentation/group/host/waiting' element={<HostWaitingRoomGroupPage />} />
            <Route path='/presentation/group/player/join' element={<JoinGameGroup />} />
            <Route path='/toan/presentation/group/host/live' element={<HostLiveGameGroupPage />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
