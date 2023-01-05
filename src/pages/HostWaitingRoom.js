import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Spin, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
// import { SocketContext } from '../../context/socket';
// import SlicePreview from '../../components/toanntt/SlicePreview';
// import { MyPresent } from './mock';
// import { getNotNullList } from '../../utils';
import MainLayout from '../layouts/MainLayout';
import { useStartGameMutation } from '../app/gameService';
import network from '../utils/network';

const { Title } = Typography;
const HostWaitingRoom = () => {
  const navigate = useNavigate();
  const { socket } = useSelector((state) => state.socket);
  const { pin } = useSelector((state) => state.game);
  const { username } = useSelector((state) => state.auth);
  const [startGame, startGameResult] = useStartGameMutation();

  const [countPlayer, setCountPlayer] = useState(0);

  const handleCopyPin = () => {
    navigator.clipboard.writeText(pin);
  };
  // const socketRef = useRef(useContext(SocketContext));
  // const [present, setPresent] = useState({});
  // const gameData = useRef({});
  // const [gameData, setGameData] = useState({});
  // const playerSet = useRef(new Set());
  const gameData = useRef({});
  // const [gameData, setGameData] = useState({});
  // const playerSet = useRef(new Set());

  const { state } = useLocation();
  console.log('state in waiting host: ', state);
  const { game } = state;
  gameData.current = game;

  useEffect(() => {
    if (pin) {
      // TODO: Gọi lên socket tạo phòng
      socket.emit('join-room', {
        name: username,
        room: pin
      });
    }
    // TODO: Lắng nghe người tham gia
    socket.on('join-room-receiver', (newPlayer) => {
      // console.log('joining message: ', newPlayer);
      setCountPlayer((num) => num + 1);
    });
  }, []);

  const handleStartGame = async () => {
    console.log('pin start game: ', pin);
    const result = await startGame({ roomId: pin, isOpen: false });
    if (result) {
      console.log(result);
      // socket.emit('student-sender', {
      //   room: pin,
      //   msg: -1
      // });
      // navigate('/host/live');
      navigate('/host/live', { state: { gameData: result.data.data.data, presenData: game.presentation } });
    }
  };

  // const playerNameList = getNotNullList([...playerSet.current]).map((player) => <div key={player}>{player}</div>);

  return (
    <MainLayout>
      <section className='courses container'>
        <button className='btn' onClick={handleCopyPin} type='button'>{`PIN: ${pin}`}</button>
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
export default HostWaitingRoom;
