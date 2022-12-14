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

const HostLiveGameGroupPage = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const getResult = async (roomID) => {
    const { data } = await API.get(`/game/gameresult/${roomID}`);
    return data;
  };
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  // const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
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
  //   // TODO: G???i message qua student s??? th??? t??? c??u h???i
  //   socket.emit('student-sender', {
  //     room: pin,
  //     msg: currentQuestion
  //   });
  //   // TODO: L???ng nghe ????p ??n student
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

  const { state } = useLocation();
  const questionList = useRef(state.presentation.questions);
  const { numberOfQuestion } = state.presentation;
  const [i, setI] = useState(0);

  const handleEndGame = async () => {
    try {
      const res = await getResult(state.roomId);
      setResultData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.emit('send-nextQuestion', {
      room: state.roomId,
      msg: -1,
    });

    socket.on('listen-nextQuestion', (msgIndex) => {
      // setinfo(JSON.stringify(msg));
      if (Number(msgIndex) < 0) return;
      setI(msgIndex);
      if (msgIndex < numberOfQuestion) {
        // setIsDisable(false);
      } else {
        handleEndGame();
      }
      setChartData([...initChart]);
    });
    socket.on('listen-answer-chart', (ansChartData) => {
      // setMessage(JSON.stringify(msg));
      // setQuestion(questions.current[msg]);

      // anwser chart data

      // const index = chartData.findIndex((item) => item.type === msg.ans);
      // const newData = [...chartData];
      // if ([0, 1, 2, 3].includes(index)) {
      //   newData[index].answers = chartData[index].answers + 1;
      // }
      const newChart = [
        { type: 'A', answers: ansChartData.A },
        { type: 'B', answers: ansChartData.B },
        { type: 'C', answers: ansChartData.C },
        { type: 'D', answers: ansChartData.D }
      ];
      setChartData([...newChart]);
    });
  }, []);

  const handleMoveQuestion = () => {
    // if (currentQuestion < numberOfQuestion - 1) {
    //   dispatch(nextQuestion({ id: currentQuestion + 1 }));
    //   setChartData(initChart);
    // }

    if (i + 1 < numberOfQuestion) {
      // setinfo(i.current);
      // setQuestion(questions.current[i.current]);
      // console.log('host send next question: ', i + 1);
      setI(i + 1);
      setChartData([...initChart]);
      socket.emit('send-nextQuestion', {
        room: state.roomId,
        msg: i + 1,
      });
    }
  };
  const handleFinishGame = () => {
    setI(i + 1);
    handleEndGame();
    socket.emit('send-nextQuestion', {
      room: state.roomId,
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
        alias: '??????'
      },
      answers: {
        alias: 'Answers'
      }
    }
  };

  const getCardButton = (index) => {
    // if (!isHost) return <div />;
    if (index < numberOfQuestion - 1) {
      return <Button onClick={() => handleMoveQuestion()}>{`${index + 1}/${numberOfQuestion}: Next`}</Button>;
    }
    return <Button onClick={() => handleFinishGame()}>{`${index + 1}/${numberOfQuestion}: Endgame`}</Button>;
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
        <div className='site-card-border-less-wrapper'>
          { i >= numberOfQuestion ? (<ResultView resultData={resultData} isHost />) : (
            <Card
              title={questionList.current[i].content}
              bordered={false}
              extra={
            // i < numberOfQuestion - 1 ? (
            //   // <Button onClick={handleMoveQuestion} disabled={counter > 0}>
            //   //   Next
            //   // </Button>
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
                  {questionList.current[i].time ? questionList.current[i].time : ''}
                </Col>
                <Col span={12}>
                  <Button block>{`A: ${questionList.current[i].ansA}`}</Button>
                </Col>
                <Col span={12}>
                  <Button block>{`B: ${questionList.current[i].ansB}`}</Button>
                </Col>
                <Col span={12}>
                  <Button block>{`C: ${questionList.current[i].ansC}`}</Button>
                </Col>
                <Col span={12}>
                  <Button block>{`D: ${questionList.current[i].ansD}`}</Button>
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
          {/* <QuestionComment /> */}
          <SendQuestionForm roomID={state.roomId} username={username} isHost status={openQuestion} />
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
          // extra={(
          //   <Space>
          //     <Button onClick={onCloseChat}>Chat</Button>
          //     <Button onClick={onCloseChat} type='primary'>
          //       Submit
          //     </Button>
          //   </Space>
          // )}
        >
          {/* <ChatForm /> */}
          <SendChatForm roomID={state.roomId} username={username} isHost status={openQuestion} socket={socket} callNoti={handleNoti} />
        </Drawer>
      </section>
    </BasicLayout>
  );
};

export default HostLiveGameGroupPage;
