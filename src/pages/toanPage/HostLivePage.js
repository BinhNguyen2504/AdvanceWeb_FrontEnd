/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Carousel, Col, Row, Space } from 'antd';
import { Link, useLocation, useParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import SlicePreview from '../../components/toanntt/SlicePreview';
import { MyPresent } from './mock';
import './carousel.css';
import ColChart from '../../components/toanntt/ColChart';
import { SocketContext } from '../../context/socket';
import axios from 'axios';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const HostLivePage = () => {
  const socketRef = useRef(useContext(SocketContext));
  const { presentid } = useParams();
  const token = localStorage.getItem('token');
  const API = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const updateRoom = (pin, status) => API.put('http://localhost:5001/api/game/updateStatus', {
      pin,
      isOpen: status
    });

  const location = useLocation();
  const gameDataRef = useRef(location.state.game);

  const [indexQuestion, setIndexQuestion] = useState(0);
  const [question, setQuestion] = useState({});

  const start = async () => {
    // update game. isOpen =  false
    const { data } = await updateRoom(gameDataRef.current.pin, false);
    console.log('data in live: ', data);

    // gửi message qua student số thứ tụ câu hỏi
    socketRef.current.emit('student-sender', {
      room: gameDataRef.current.pin,
      msg: indexQuestion
    });
    console.log('gameRef: ', gameDataRef.current);
    setQuestion(gameDataRef.current.presentation.questions[indexQuestion]);

    // socket.current.emit('start-room', '638b150d3e3d7cf25e187ef2');
  };

  useEffect(() => {
    start();
  });

  const next = () => {
    setIndexQuestion(indexQuestion + 1);
    if (indexQuestion < gameDataRef.current.presentation.questions.length - 1) {
      setQuestion(gameDataRef.current.presentation.questions[indexQuestion + 1]);

      socketRef.current.emit('student-sender', {
        room: gameDataRef.current.pin,
        msg: indexQuestion + 1,
      });
    }
  };

  return (
    <MainLayout>
      <section className='courses container'>
        <p className='btn'>Title: Presentation number 1</p>
        <div className='site-card-border-less-wrapper'>
          <Card
            title={question.content}
            bordered={false}
            extra={indexQuestion < gameDataRef.current.presentation.questions.length - 1 ? <Button onClick={next}>Next</Button> : <Button>Endgame</Button>}
            style={{
              height: 600,
              width: '100%'
            }}
          >
            <ColChart />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button block>
                  A:
                  {question.ansA}
                </Button>
              </Col>
              <Col span={12}>
                <Button block>
                  B:
                  {question.ansB}
                </Button>
              </Col>
              <Col span={12}>
                <Button block>
                  C:
                  {question.ansC}
                </Button>
              </Col>
              <Col span={12}>
                <Button block>
                  D:
                  {question.ansD}
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
};
export default HostLivePage;
