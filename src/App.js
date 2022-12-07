import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
import { SocketContext, socket } from './context/socket';
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
import JoinGame from './pages/JoinGame';
import WaitingRoom from './pages/WaitingRoom';

import './variables.css';
import './index.css';
import './App.css';
import GamePage from './pages/Game/Game';
import JoinGameClient from './pages/Game/JoinGame';
import PlayerScreen from './pages/Game/ScreenPlayer';
import PresentListPage from './pages/toanPage/PresentListPage';
import PresentPreviewPage from './pages/toanPage/PresentPreviewPage';
import WaitingHostPage from './pages/toanPage/WaitingHostPage';
import HostLivePage from './pages/toanPage/HostLivePage';
// import { createSocket } from './app/socketSlice';
import TestNaviPage from './pages/toanPage/testPassNavigationPage';
import PlayerWaitingPage from './pages/toanPage/player/PlayerWaitingPage';
import PlayerLivePage from './pages/toanPage/player/PlayerLivePage';

const App = () => {
  const user = localStorage.getItem('token');
  const dispatch = useDispatch();
  if (user) {
    setAuthHeader(user);
  }
  const { data, isLoading } = useGetProfileQuery(user, {
    skip: !user
  });
  useEffect(() => {
    async function loadUser() {
      if (data) {
        const { email, username, _id } = data.data;
        await dispatch(loginUser({ email, username, id: _id }));
      } else {
        setAuthHeader(null);
      }
    }
    loadUser();
  }, [isLoading, data]);

  // add connect socket io
  // useEffect(() => {
  //   const socket = io('http://localhost:5001');
  //   dispatch(createSocket(socket));
  //   return () => socket.disconnect();
  // }, [dispatch]);

  // ? Usage:
  // import { useSelector } from 'react-redux';
  // const { socket } = useSelector((state) => state.socket);

  return (
    <SocketContext.Provider value={socket}>
      <main>
        {isLoading ? (
          <h1>Loading user info...</h1>
        ) : (
          <Routes>
            <Route index element={<JoinGame />} />
            <Route path='/waiting' element={<WaitingRoom />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='/game/:id' element={<GamePage />} />
            <Route path='/join' element={<JoinGameClient />} />
            <Route path='/game/player/:pin/:userid' element={<PlayerScreen />} />
            <Route path='/toan/presentation' element={<PresentListPage />} />
            <Route path='/toan/presentation/preview/:presentid' element={<PresentPreviewPage />} />
            <Route path='/toan/presentation/host/waiting/:presentid' element={<WaitingHostPage />} />
            <Route path='/toan/presentation/host/live/:presentid' element={<HostLivePage />} />
            <Route path='/toan/presentation/player/waiting/:gamepin' element={<PlayerWaitingPage />} />
            <Route path='/toan/presentation/player/live/:gamepin' element={<PlayerLivePage />} />
            <Route path='/toan/test/navi' element={<TestNaviPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/groups' element={<GroupList />} />
              <Route path='/groups/:id' element={<GroupDetail />} />
              <Route path='/groups/create' element={<GroupForm />} />

              <Route path='/presentation' element={<PresentList />} />
              <Route path='/presentation/create' element={<PresentEdit />} />
              <Route path='/presentation/:id' element={<PresentItem />} />
              <Route path='/presentation/:id/edit' element={<PresentEdit />} />
              <Route path='/report' element={<ReportSlide />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        )}
      </main>
    </SocketContext.Provider>
  );
};

export default App;
