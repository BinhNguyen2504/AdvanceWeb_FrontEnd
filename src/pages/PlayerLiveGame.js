/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import { Button, Card, Col, Divider, Drawer, notification, Row, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { nextQuestion } from '../app/gameSlice';
import ResultView from '../components/game/resultView';
import SendChatForm from '../components/Question/sendChatForm';
import SendQuestionForm from '../components/Question/sendQuestionForm';
import { BASE_URL } from '../constants';
import BasicLayout from '../layouts/BasicLayout';
import { openNotification } from '../utils';

const PlayerLiveGame = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  const sendAnswer = (roomId, username, question, ans) => API.put(`/game/answer/${roomId}`, {
    username,
    question,
    ans
  });

  const getResult = async (roomID) => {
    const { data } = await API.get(`/game/gameresult/${roomID}`);
    return data;
  };

  // const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
  // const { username } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { roomID } = state;
  const { player } = state;
  const { game } = state;
  const { questions } = game;
  const { numberOfQuestion } = game;
  const [isDisable, setIsDisable] = useState(false);
  const [i, setI] = useState(0);
  const [counter, setCounter] = useState(i < numberOfQuestion ? questions[i].time : 0);
  // const dispatch = useDispatch();
  const [resultData, setResultData] = useState({});

  const [openQuestion, setOpenQuestion] = useState(false);
  const showQuestionDrawer = () => {
    setOpenQuestion(true);
  };
  const onCloseQuestion = () => {
    setOpenQuestion(false);
  };

  const [openChat, setOpenChat] = useState(false);
  const showChatDrawer = () => {
    setOpenChat(true);
  };
  const onCloseChat = () => {
    setOpenChat(false);
  };

  const initChart = [
    { type: 'A', answers: 0 },
    { type: 'B', answers: 0 },
    { type: 'C', answers: 0 },
    { type: 'D', answers: 0 }
  ];
  const [chartData, setChartData] = useState(initChart);
  // const navigate = useNavigate();

  const handleEndGame = async () => {
    try {
      const res = await getResult(roomID);
      setResultData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (counter > 0) {
  //       setCounter((prev) => prev - 1);
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  useEffect(() => {
    document.body.requestFullscreen();
    return () => document.exitFullscreen();
  }, []);

  useEffect(() => {
    socket.on('listen-nextQuestion', (index) => {
      if (Number(index) < 0) return;
      setI(index);
      if (index < numberOfQuestion) {
        setIsDisable(false);
      } else {
        handleEndGame();
      }
      setChartData([...initChart]);
    });

    socket.on('listen-answer-chart', (ansChartData) => {
      const newChart = [
        { type: 'A', answers: ansChartData.A },
        { type: 'B', answers: ansChartData.B },
        { type: 'C', answers: ansChartData.C },
        { type: 'D', answers: ansChartData.D }
      ];
      setChartData([...newChart]);
    });

    // socket.on('student-receiver', (msg) => {
    //   if (msg < numberOfQuestion) {
    //     dispatch(nextQuestion({ id: msg }));
    //   } else {
    //     navigate('/');
    //   }
    // });
    // setCounter(questions[currentQuestion].time);
    // setIsDisable(false);
  }, []);

  const config = {
    data: chartData,
    xField: 'type',
    yField: 'answers',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      type: {
        alias: '类别'
      },
      answers: {
        alias: 'Answers'
      }
    }
  };

  const handleAnswer = async (ans) => {
    try {
      const { data } = await sendAnswer(roomID, player, i + 1, ans);
    } catch (error) {
      console.log(error);
    }
    socket.emit('send-answer-chart', {
      room: roomID,
      msg: i + 1
    });
    setIsDisable(true);
    // console.log('result ans: ', data);
  };

  const [api, contextHolder] = notification.useNotification();
  const handleNoti = () => {
    openNotification(
      api,
      'New message',
      'You have new message',
      <SmileOutlined style={{ color: '#108ee9' }} />
    );
  };

  return (
    <BasicLayout>
      <section className='courses'>
        {contextHolder}
        <p className='btn'>{game.name}</p>
        <div className='site-card-border-less-wrapper'>
          {i >= numberOfQuestion ? (
            <ResultView resultData={resultData} isHost={false} />
          ) : (
            <Card
              title={questions[i].content}
              bordered={false}
              style={{
                height: 300,
                width: '100%'
              }}
            >
              <Column {...config} height={300} />
              <div style={{ marginTop: '60px' }} />
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  Time:
                  {counter}
                </Col>
                <Col span={12}>
                  <Button block onClick={() => handleAnswer('A')} disabled={isDisable || counter <= 0}>
                    {`A: ${questions[i].ansA}`}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block onClick={() => handleAnswer('B')} disabled={isDisable || counter <= 0}>
                    {`B: ${questions[i].ansB}`}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block onClick={() => handleAnswer('C')} disabled={isDisable || counter <= 0}>
                    {`C: ${questions[i].ansC}`}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block onClick={() => handleAnswer('D')} disabled={isDisable || counter <= 0}>
                    {`D: ${questions[i].ansD}`}
                  </Button>
                </Col>
              </Row>
            </Card>
          )}
        </div>
        <Divider />

        <Drawer
          title='Question for Presentation'
          width={720}
          onClose={onCloseQuestion}
          open={openQuestion}
          placement="left"
          bodyStyle={{
            paddingBottom: 80
          }}
          // extra={(
          //   <Space>
          //     <Button onClick={onCloseQuestion}>Cancel</Button>
          //     <Button onClick={onCloseQuestion} type='primary'>
          //       Submit
          //     </Button>
          //   </Space>
          // )}
        >
          <SendQuestionForm roomID={roomID} username={player.username} isHost={false} status={openQuestion} />
        </Drawer>

        <Drawer
          title='Chat for Presentation'
          width={720}
          onClose={onCloseChat}
          placement="right"
          open={openChat}
          bodyStyle={{
            paddingBottom: 80
          }}
          extra={(
            <Space>
              <Button onClick={onCloseChat}>Cancel</Button>
              <Button onClick={onCloseChat} type='primary'>
                Submit
              </Button>
            </Space>
          )}
        >
          <SendChatForm roomID={roomID} username={player.username} isHost={false} status={openQuestion} socket={socket} callNoti={handleNoti} />
        </Drawer>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button type='primary' onClick={showQuestionDrawer} icon={<PlusOutlined />} block>
              Question
            </Button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button type='primary' onClick={showChatDrawer} icon={<PlusOutlined />} block>
              Chat
            </Button>
          </Col>

        </Row>
      </section>
    </BasicLayout>
  );
};
export default PlayerLiveGame;
