/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Carousel, Col, Row, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '../../../layouts/MainLayout';
import SlicePreview from '../../../components/toanntt/SlicePreview';
import { MyPresent } from '../mock';
import '../carousel.css';
import ColChart from '../../../components/toanntt/ColChart';
import { SocketContext } from '../../../context/socket';

const contentStyle = {
  margin: 0,
  //   height: '460px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
};
const PlayerLivePage = () => {
  const location = useLocation();
  const socketRef = useRef(useContext(SocketContext));
  console.log('location state: ', location);
  console.log('socket: ', socketRef.current);
  const [present, setPresent] = useState({});

  const gameDataRef = useRef(location.state.game);
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

  useEffect(() => {
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
    <MainLayout>
      <section className='courses container'>
        <p className='btn'>Title: Presentation number 1</p>
        <div className='site-card-border-less-wrapper'>
          <Card
            title={question.content}
            bordered={false}
            style={{
              height: 300,
              width: '100%'
            }}
          >
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
export default PlayerLivePage;
