import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button, Spin, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { SocketContext } from '../../context/socket';
// import SlicePreview from '../../components/toanntt/SlicePreview';
// import { MyPresent } from './mock';
// import { getNotNullList } from '../../utils';
import MainLayout from '../layouts/MainLayout';
import { useStartGameMutation } from '../app/gameService';

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
  useEffect(() => {
    if (pin) {
      // TODO: Gọi lên socket tạo phòng
      socket.emit('create-room', {
        name: username,
        room: pin
      });
    }
    // TODO: Lắng nghe người tham gia
    socket.on('join-room-receiver', (newPlayer) => {
      console.log('joining message: ', newPlayer);
      setCountPlayer((num) => num + 1);
    });
  }, []);

  const handleStartGame = async () => {
    const result = await startGame({ pin, isOpen: false });
    if (result) {
      console.log(result);
      navigate('/host/live');
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
