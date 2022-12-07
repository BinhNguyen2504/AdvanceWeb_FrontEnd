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
  const initAnsData = [
    {
      type: 'A',
      num: 0
    },
    {
      type: 'B',
      num: 0
    },
    {
      type: 'C',
      num: 0
    },
    {
      type: 'D',
      num: 0
    }
  ];
  const [ansData, setAnsData] = useState(initAnsData);
  const start = async () => {
    // update game. isOpen =  false
    const { data } = await updateRoom(gameDataRef.current.pin, false);
    console.log('data in live: ', data);

    // gửi message qua student số thứ tụ câu hỏi
    socketRef.current.emit('student-sender', {
      room: gameDataRef.current.pin,
      msg: indexQuestion
    });

    const updateData = (ans) => {
      console.log('ans: ', ans);
      console.log('ansData: ', ansData);
      const newArr = [...ansData];
      if (ans === 'A') {
        newArr[0].num = 10;
      } else if (ans === 'B') {
        newArr[1].num = ansData[1].num + 1;
      } else if (ans === 'C') {
        newArr[2].num = ansData[2].num + 1;
      } else if (ans === 'D') {
        newArr[3].num = ansData[3].num + 1;
      }
      console.log('newArr: ', newArr);
      setAnsData([...newArr]);
    };

    socketRef.current.on('teacher-receiver', (msg) => {
      console.log('receive answer from player: ', msg);
      updateData(msg.ans);
      // setAnsData(current =>
      //   current.map(ans => {
      //     if (ans.type === msg) {
      //       return {...ans,
      //         num: ans.num + 1
      //       };
      //     }
      //     return ans;
      //   }),
      // );
    });

    console.log('gameRef: ', gameDataRef.current);
    setQuestion(gameDataRef.current.presentation.questions[indexQuestion]);

    // socket.current.emit('start-room', '638b150d3e3d7cf25e187ef2');
  };

  const counting = useRef(0);
  useEffect(() => {
    counting.current += 1;
    console.log('COUNTING: ', counting.current);
    start();
  }, []);

  const next = () => {
    setIndexQuestion(indexQuestion + 1);
    setAnsData(initAnsData);
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
            <ColChart ansData={ansData} />
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
