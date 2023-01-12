/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-wrap-multilines */
import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row, DatePicker, Drawer, Form, Input, Select, Space, Divider, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlusOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
import { nextQuestion } from '../../app/gameSlice';
import BasicLayout from '../../layouts/BasicLayout';
import PresentQuestionForm from '../../components/Question/CommonForm';
import QuestionComment from '../../components/Question/questionComment';
import SendQuestionForm from '../../components/Question/sendQuestionForm';
import ChatForm from '../../components/Question/chatDrawer';
import { BASE_URL } from '../../constants';
import ResultView from '../../components/game/resultView';
import SendChatForm from '../../components/Question/sendChatForm';
import { openNotification } from '../../utils';

const { Option } = Select;

const PlayerLiveGameGroupPage = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  const sendAnswer = (roomId, username, question, ans) => API.put(`/game/answer/${roomId}`, {
    username,
    question,
    ans,
  });

  const getResult = async (roomID) => {
    const { data } = await API.get(`/game/gameresult/${roomID}`);
    return data;
  };
  const { username } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const { state } = useLocation();
  const { roomID } = state;
  const { player } = state;
  const { game } = state;
  const { isHost } = game;
  const { questions } = game;
  const numberOfQuestion = questions.length;
  const [openQuestion, setOpenQuestion] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [i, setI] = useState(0);
  const [counter, setCounter] = useState(i < numberOfQuestion ? questions[i].time : 0);
  const [resultData, setResultData] = useState({});

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

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const [chartData, setChartData] = useState(initChart);
  // const [counter, setCounter] = useState(questions[currentQuestion].time);

  // useEffect(() => {
  //   document.body.requestFullscreen();
  //   return () => document.exitFullscreen();
  // }, []);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (counter > 0) {
  //       setCounter((prev) => prev - 1);
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);
  // useEffect(() => {
  //   // TODO: Gửi message qua student số thứ tự câu hỏi
  //   socket.emit('student-sender', {
  //     room: pin,
  //     msg: currentQuestion
  //   });
  //   // TODO: Lắng nghe đáp án student
  //   socket.on('teacher-receiver', (msg) => {
  //     const index = chartData.findIndex((item) => item.type === msg.ans);
  //     const newData = [...chartData];
  //     if ([0, 1, 2, 3].includes(index)) {
  //       newData[index].answers = chartData[index].answers + 1;
  //     }
  //     setChartData([...newData]);
  //   });
  //   setCounter(questions[currentQuestion].time);
  // }, [currentQuestion]);

  const handleEndGame = async () => {
    try {
      const res = await getResult(roomID);
      setResultData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // socket.emit('send-nextQuestion', {
    //   room: state.roomId,
    //   msg: -1,
    // });

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
  }, []);

  useEffect(() => {
    // const timer = setInterval(() => {
    //   if (counter > 0) {
    //     setCounter((prev) => prev - 1);
    //   }
    // }, 1000);
    // return () => clearInterval(timer);
  }, [counter]);

  const handleMoveQuestion = () => {
    if (i + 1 < numberOfQuestion) {
      setI(i + 1);
      setIsDisable(false);
      setChartData([...initChart]);
      socket.emit('send-nextQuestion', {
        room: roomID,
        msg: i + 1,
      });
    }
  };
  const handleFinishGame = () => {
    setI(i + 1);
    handleEndGame();
    socket.emit('send-nextQuestion', {
      room: roomID,
      msg: i + 1,
    });
    setChartData([...initChart]);
  };

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

  const getCardButton = (index) => {
    if (!isHost) return <div />;
    if (index < numberOfQuestion - 1) {
      return <Button onClick={() => handleMoveQuestion()}>{`${index + 1}/${numberOfQuestion}: Next`}</Button>;
    }
    return <Button onClick={() => handleFinishGame()}>{`${index + 1}/${numberOfQuestion}: Endgame`}</Button>;
  };

  const handleAnswer = async (ans) => {
    try {
      const { data } = await sendAnswer(
        roomID,
        username,
        i + 1,
        ans
      );
    } catch (error) {
      console.log(error);
    }
    socket.emit('send-answer-chart', {
      room: roomID,
      msg: i + 1,
    });
    setIsDisable(true);
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
        <p className='btn'>Player Screen</p>
        <div className='site-card-border-less-wrapper'>
          { i >= numberOfQuestion ? (<ResultView resultData={resultData} isHost={false} />) : (
            <Card
              title={questions[i].content}
              bordered={false}
              extra={
              // i.current < numberOfQuestion - 1 ? (
              //   <Button onClick={handleMoveQuestion} disabled={false}>
              //     Next
              //   </Button>
              // ) : (
              //   <Button onClick={handleFinishGame} disabled={false}>
              //     Endgame
              //   </Button>
              // )
              getCardButton(i)
            }
              style={{
                height: 600,
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
          <SendQuestionForm roomID={roomID} username={username} isHost={isHost} status={openQuestion} />
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
          <SendChatForm roomID={roomID} username={username} isHost={isHost} status={openQuestion} socket={socket} callNoti={handleNoti} />
        </Drawer>
      </section>
    </BasicLayout>
  );
};

export default PlayerLiveGameGroupPage;
