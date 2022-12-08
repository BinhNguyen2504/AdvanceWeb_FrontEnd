/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Carousel, Col, Row, Space } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import SlicePreview from '../../../components/toanntt/SlicePreview';
import { MyPresent } from '../mock';
import '../carousel.css';
import ColChart from '../../../components/toanntt/ColChart';
import { SocketContext } from '../../../context/socket';

const PlayerLivePage = () => {
  const counting = useRef(0);
  const location = useLocation();
  const socketRef = useRef(useContext(SocketContext));
  console.log('location state: ', location);
  console.log('socket: ', socketRef.current);
  const [present, setPresent] = useState({});
  const { gamepin } = useParams();
  const gameDataRef = useRef(location.state.game);
  const { userInfo } = location.state;
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [question, setQuestion] = useState({});
  useEffect(() => {
    setPresent(MyPresent);
  });

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const start = async () => {
    console.log('gameRef: ', gameDataRef.current);
    setQuestion(gameDataRef.current.questions[indexQuestion]);

    // socket.current.emit('start-room', '638b150d3e3d7cf25e187ef2');
  };

  const sendAnswer = (ans) => {
    // gửi câu trả lời tới teacher
    console.log('ans: ', ans);
    socketRef.current.emit('teacher-sender', {
      room: gamepin,
      msg: { username: userInfo.username, ans } // msg tự custom
    });
  };

  useEffect(() => {
    counting.current += 1;
    console.log('COUNTING: ', counting.current);
    start();

    socketRef.current.on('student-receiver', (msg) => {
      console.log('receive: ', msg);
      if (msg < gameDataRef.current.questions.length) {
        setIndexQuestion(msg);
        setQuestion(gameDataRef.current.questions[msg]);
      }
    });
  }, []);

  return (

  );
};
export default PlayerLivePage;
