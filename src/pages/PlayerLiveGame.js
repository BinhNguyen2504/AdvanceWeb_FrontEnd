/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { nextQuestion } from '../app/gameSlice';
import ResultView from '../components/game/resultView';
import { BASE_URL } from '../constants';
import BasicLayout from '../layouts/BasicLayout';

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
    console.log(' data: ', data);
    return data;
  };

  // const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
  // const { username } = useSelector((state) => state.auth);
  const { state } = useLocation();
  const { roomID } = state;
  const { player } = state;
  console.log('player name: ', player);
  const { game } = state;
  const { questions } = game;
  const { numberOfQuestion } = game;
  const [isDisable, setIsDisable] = useState(false);
  const [i, setI] = useState(0);
  const [counter, setCounter] = useState(i < numberOfQuestion ? questions[i].time : 0);
  // const dispatch = useDispatch();
  const [resultData, setResultData] = useState({});
  const initChart = [
    { type: 'A', answers: 0 },
    { type: 'B', answers: 0 },
    { type: 'C', answers: 0 },
    { type: 'D', answers: 0 }
  ];
  const [chartData, setChartData] = useState(initChart);
  // const navigate = useNavigate();

  const handleEndGame = async () => {
    console.log('endgame');
    try {
      const res = await getResult(roomID);
      setResultData(res.data);
      console.log('result game: ', res);
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
        console.log('else case i: ', index);
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
      console.log('player: ', player);
      console.log('i + 1: ', i + 1);
      console.log('ans: ', ans);
      const { data } = await sendAnswer(roomID, player, i + 1, ans);
    } catch (error) {
      console.log(error);
    }
    socket.emit('send-answer-chart', {
      room: roomID,
      msg: i + 1
    });
    setIsDisable(true);
    console.log('send anwser: ', ans);

    console.log('counter: ', counter);
    console.log('questions: ', questions);
    // console.log('result ans: ', data);
  };

  // const sendAnswer = (answer) => {
  //   socket.emit('teacher-sender', {
  //     room: pin,
  //     msg: { username, ans: answer }
  //   });
  //   setIsDisable(true);
  // };

  return (
    <BasicLayout>
      <section className='courses'>
        <p className='btn'>{game.name}</p>
        <div className='site-card-border-less-wrapper'>
          {i >= numberOfQuestion ? (
            <ResultView resultData={resultData} />
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
      </section>
    </BasicLayout>
  );
};
export default PlayerLiveGame;
