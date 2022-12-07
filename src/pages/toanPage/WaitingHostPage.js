/* eslint-disable no-unused-vars */
import axios from 'axios';

import { useSelector } from 'react-redux';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Carousel, message, Space, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { SocketContext } from '../../context/socket';
import SlicePreview from '../../components/toanntt/SlicePreview';
import { MyPresent } from './mock';
import './carousel.css';
import { getNotNullList } from '../../utils';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const WaitingHostPage = () => {
  const navigate = useNavigate();
  // const { socket } = useSelector((state) => state.socket);
  // const socketRef = useRef(socket);
  const socketRef = useRef(useContext(SocketContext));
  const { presentid } = useParams();
  const token = localStorage.getItem('token');
  const API = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const createGame = (body) => API.post('http://localhost:5001/api/game/creategame', body);

  const [present, setPresent] = useState({});
  // const gameData = useRef({});
  const [gameData, setGameData] = useState({});
  const [countPlayer, setCountPlayer] = useState(0);
  const playerSet = useRef(new Set());
  useEffect(() => {
    console.log('Present: ', presentid);
    const fetchGame = async (id) => {
      const { data } = await createGame({
        presentationId: presentid
      });
      // gameData.current = data.data;
      setGameData(data.data);
      // socketRef.current.emit('create-room', {
      //   //  Tên định danh socket - duy nhất - có thể dùng id hoặc user name
      //   name: 'tranthetoan',
      //   room: data.data.pin
      // });
      socketRef.current.emit('create-room', {
        //  Tên định danh socket - duy nhất - có thể dùng id hoặc user name
        name: 'tranthetoan',
        room: data.data.pin
      });

      // Lắng nghe người tham gia
      socketRef.current.on('join-room-receiver', (playerName) => {
        console.log('joining message: ');
        playerSet.current.add(playerName);
        setCountPlayer(playerSet.current.size);
      });
    };
    fetchGame(presentid);
  }, []);

  const create = async () => {
    // tạo game : trả về
    // i.current = 0;
    const { data } = await createGame({
      presentationId: presentid
    });

    // danh sách các câu hỏi
    gameData.current = data.data;
    // setMessage(JSON.stringify(data.data));

    // gọi lên socket tạo phòng
    socketRef.current.emit('create-room', {
      //  Tên định danh socket - duy nhất - có thể dùng id hoặc user name
      name: 'tranthetoan',
      room: data.data.pin
    });

    // questions.current = data.data.presentation.questions;
    // setMessage(JSON.stringify(data.data.pin));
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const handleStartGame = () => {
    console.log('start game click');
    console.log('socket: ', socketRef.current);

    navigate(`/toan/presentation/host/live/${presentid}`, { state: { game: gameData } });
  };

  const playerNameList = getNotNullList([...playerSet.current]).map((player) => <div key={player}>{player}</div>);

  return (
    <MainLayout>
      <section className='courses container'>
        <p className='btn'>
          Pin: APTX-4869, real:
          {gameData.pin}
        </p>

        <div className='example'>
          <Spin tip='Waiting other player' size='large'>
            <div className='content' />
          </Spin>
        </div>
        <br />
        <br />
        <br />
        <br />
        <p>
          Player Number:
          {countPlayer}
        </p>
        {playerNameList}
        <br />
        <br />
        <br />
        <Button type='primary' htmlType='submit' className='btn' onClick={handleStartGame}>
          Start Game
        </Button>
      </section>
    </MainLayout>
  );
};
export default WaitingHostPage;
