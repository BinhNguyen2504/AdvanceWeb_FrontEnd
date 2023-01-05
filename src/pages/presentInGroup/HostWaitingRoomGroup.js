/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Spin, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
// import { SocketContext } from '../../context/socket';
// import SlicePreview from '../../components/toanntt/SlicePreview';
// import { MyPresent } from './mock';
// import { getNotNullList } from '../../utils';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
// import { useStartGameMutation } from '../../app/gameService';
import groupAPI from '../../api/groupAPI';
import { BASE_URL } from '../../constants';

const { Title } = Typography;
const HostWaitingRoomGroupPage = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const updateRoomAPI = async (pin, status) => {
    const { data } = await API.put('/game/updateStatus', {
      roomId: pin,
      isOpen: status
    });
    return data;
  };
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.socket);
  // const { pin } = useSelector((state) => state.game);
  const pin = 1;
  const { username } = useSelector((state) => state.auth);
  console.log('username in waiting', username);
  // const [startGame, startGameResult] = useStartGameMutation();

  const [countPlayer, setCountPlayer] = useState(0);

  const handleCopyPin = () => {
    navigator.clipboard.writeText(pin);
  };
  // const socketRef = useRef(useContext(SocketContext));
  // const [present, setPresent] = useState({});
  const gameData = useRef({});
  // const [gameData, setGameData] = useState({});
  // const playerSet = useRef(new Set());

  const { state } = useLocation();
  gameData.current = state.game;
  useEffect(() => {
    if (gameData.current.roomId) {
      // TODO: Gọi lên socket tạo phòng
      socket.emit('join-room', {
        name: username,
        room: gameData.current.roomId
      });
    }
    // // TODO: Lắng nghe người tham gia
    // socket.on('join-room-receiver', (newPlayer) => {
    //   console.log('joining message: ', newPlayer);
    //   setCountPlayer((num) => num + 1);
    // });
    console.log('location: ', state);
    console.log('presentID: ', gameData.current.presentation._id);
    console.log('room', gameData.current.roomId);
    console.log('socketID host: ', socket.id);
  }, []);

  const handleStartGame = async () => {
    const data = await updateRoomAPI(gameData.current.roomId, false);
    // const result = await startGame({ pin, isOpen: false });
    // if (result) {
    //   console.log(result);
    //   socket.emit('student-sender', {
    //     room: pin,
    //     msg: -1
    //   });
    //   navigate('/host/live');
    // }
    navigate('/presentation/group/host/live', { state: gameData.current });
  };

  // const playerNameList = getNotNullList([...playerSet.current]).map((player) => <div key={player}>{player}</div>);

  return (
    <MainLayout>
      <section className='courses container'>
        <button className='btn' onClick={handleCopyPin} type='button'>
          {`PIN: ${gameData.current.roomId ? gameData.current.roomId : ''}`}
        </button>
        <Title>{` Player Number:${countPlayer}`}</Title>
        <div className='example' style={{ marginBottom: 400 }}>
          <Spin tip='Waiting other player' size='large'>
            <div className='content' />
          </Spin>
        </div>
        <Button type='primary' className='btn' onClick={handleStartGame}>
          Start Game
        </Button>
      </section>
    </MainLayout>
  );
};
export default HostWaitingRoomGroupPage;
