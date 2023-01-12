import { Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';

const PlayerWaitingRoom = () => {
  const { socket } = useSelector((state) => state.socket);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { roomID } = state;
  const { gameData } = state;
  const { username } = state;

  useEffect(() => {
    document.body.requestFullscreen();
    socket.emit('join-room', {
      name: username,
      room: roomID
    });

    socket.on('listen-nextQuestion', (msg) => {
      if (msg === -1) {
        navigate('/player/live', { state: { player: username, game: gameData, roomID }, replace: true });
      }
    });

    // socket.on('student-receiver', (msg) => {
    //   if (msg === -1) navigate('/player/live');
    // });
  }, []);

  return (
    <BasicLayout>
      <main className='courses'>
        <div style={{ marginTop: '300px' }} />
        <div className='example'>
          <Spin tip='Waiting other player' size='large'>
            <div className='content' />
          </Spin>
          {/* <h2>You joined the game</h2>
        <h4>Waiting on a host to start the game</h4> */}
        </div>
      </main>
    </BasicLayout>
  );
};

export default PlayerWaitingRoom;
