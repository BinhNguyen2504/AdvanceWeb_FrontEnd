/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-wrap-multilines */
import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row, DatePicker, Drawer, Form, Input, Select, Space, Divider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
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

const { Option } = Select;

const ReviewGamePage = () => {
  const { roomId } = useParams();
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

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
  // const [chartData, setChartData] = useState(initChart);
  // const [counter, setCounter] = useState(questions[currentQuestion].time);

  const { state } = useLocation();

  const getGameData = async () => {
    try {
      const res = await getResult(roomId);
      setResultData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGameData();
  }, []);
  //   // if (currentQuestion < numberOfQuestion - 1) {
  //   //   dispatch(nextQuestion({ id: currentQuestion + 1 }));
  //   //   setChartData(initChart);
  //   // }

  //   if (i + 1 < numberOfQuestion) {
  //     // setinfo(i.current);
  //     // setQuestion(questions.current[i.current]);
  //     console.log('host send next question: ', i + 1);
  //     setI(i + 1);
  //     setChartData([...initChart]);
  //     socket.emit('send-nextQuestion', {
  //       room: state.roomId,
  //       msg: i + 1,
  //     });
  //   }
  // };
  // const handleFinishGame = () => {
  //   console.log('host emit i: ', i + 1);
  //   setI(i + 1);
  //   handleEndGame();
  //   socket.emit('send-nextQuestion', {
  //     room: state.roomId,
  //     msg: i + 1,
  //   });
  //   setChartData([...initChart]);
  // };

  // const config = {
  //   data: chartData,
  //   xField: 'type',
  //   yField: 'answers',
  //   label: {
  //     position: 'middle',
  //     style: {
  //       fill: '#FFFFFF',
  //       opacity: 1
  //     }
  //   },
  //   xAxis: {
  //     label: {
  //       autoHide: true,
  //       autoRotate: false
  //     }
  //   },
  //   meta: {
  //     type: {
  //       alias: '??????'
  //     },
  //     answers: {
  //       alias: 'Answers'
  //     }
  //   }
  // };

  // const getCardButton = (index) => {
  //   // if (!isHost) return <div />;
  //   if (index < numberOfQuestion - 1) {
  //     return <Button onClick={() => handleMoveQuestion()}>{`${index + 1}/${numberOfQuestion}: Next`}</Button>;
  //   }
  //   return <Button onClick={() => handleFinishGame()}>{`${index + 1}/${numberOfQuestion}: Endgame`}</Button>;
  // };

  return (
    <BasicLayout>
      <section className='courses'>
        <p className='btn'>Review Game</p>
        <div className='site-card-border-less-wrapper'>
          <ResultView resultData={resultData} isHost={false} />
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
          <SendQuestionForm roomID={roomId} username='anonymous' isHost status={openQuestion} />
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
          <SendChatForm roomID={roomId} username='anonymous' isHost status={openQuestion} socket={socket} />
        </Drawer>
      </section>
    </BasicLayout>
  );
};

export default ReviewGamePage;
