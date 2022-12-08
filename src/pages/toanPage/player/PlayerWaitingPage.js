/* eslint-disable no-unused-vars */
import axios from 'axios';

import { useSelector } from 'react-redux';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Carousel, Space, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import { SocketContext } from '../../../context/socket';
import SlicePreview from '../../../components/toanntt/SlicePreview';
import { MyPresent } from '../mock';
import '../carousel.css';
import { BASE_URL } from '../../../constants';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const PlayerWaitingPage = () => {
  const navigate = useNavigate();
  // const { socket } = useSelector((state) => state.socket);
  // const socketRef = useRef(socket);
  const socketRef = useRef(useContext(SocketContext));
  const [question, setQuestion] = useState();
  const questions = useRef();
  const { gamepin } = useParams();
  const token = localStorage.getItem('token');
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const getPresentationByPin = (pin) => API.get(`/presentation/getbypin/${pin}`);

  const [present, setPresent] = useState({});
  const gameDataRef = useRef({});
  const userInfo = {
    username: `name_${socketRef.current.id}`
  };
  //   const [gameData, setGameData] = useState({});

  const join = async () => {
    console.log('inside join function');
    // check isOpen => true + tên không tồn tại => trả về presentation
    const { data } = await getPresentationByPin(gamepin);
    console.log('player screen data: ', data);
    console.log('game: ', data.data);
    // setGameData(data.data);
    gameDataRef.current = data.data;
    socketRef.current.emit('join-room', {
      name: `Studentoan_${socketRef.current.id}`,
      room: gamepin
    });
  };

  useEffect(() => {
    console.log('Present: ', gamepin);
    join();

    socketRef.current.on('student-receiver', (msg) => {
      console.log('game in socket listen: ', gameDataRef.current);
      if (msg === '0' || msg === 0) {
        navigate(`/toan/presentation/player/live/${gamepin}`, { state: { game: gameDataRef.current, userInfo } });
      }
    });
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <MainLayout>
      <section className='courses container'>
        <p className='btn'>
          Player Screen: Pin:
          {gamepin}
        </p>
        <br />
        <br />
        <br />
        <br />
        <div className='example'>
          <Spin tip='Waiting other player' size='large'>
            <div className='content' />
          </Spin>
        </div>
        <br />
        <br />
        <br />
        <br />
      </section>
    </MainLayout>
  );
};
export default PlayerWaitingPage;
