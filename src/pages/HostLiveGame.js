import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { nextQuestion } from '../app/gameSlice';
import ResultView from '../components/game/resultView';
import { BASE_URL } from '../constants';
import BasicLayout from '../layouts/BasicLayout';

const HostLiveGame = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const getResult = async (roomID) => {
    const { data } = await API.get(`/game/gameresult/${roomID}`);
    console.log(' data: ', data);
    return data;
  };

  const initChart = [
    { type: 'A', answers: 0 },
    { type: 'B', answers: 0 },
    { type: 'C', answers: 0 },
    { type: 'D', answers: 0 }
  ];

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { name, questions, numberOfQuestion } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
  const [chartData, setChartData] = useState(initChart);

  const { state } = useLocation();
  const questionList = useRef(state.presenData.questions);
  const { numberOfQuestion } = state.presenData;
  const [i, setI] = useState(0);
  const [resultData, setResultData] = useState({});
  // const [counter, setCounter] = useState(questions[i].time);
  useEffect(() => {
    document.body.requestFullscreen();
    return () => document.exitFullscreen();
  }, []);
  // useEffect(() => {
  // const timer = setInterval(() => {
  //   if (counter > 0) {
  //     setCounter((prev) => prev - 1);
  //   }
  // }, 1000);
  // return () => clearInterval(timer);
  // }, [counter]);

  const handleEndGame = async () => {
    console.log('endgame');
    try {
      const res = await getResult(state.gameData.roomId);
      console.log('result game: ', res);
      setResultData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('state in live: ', state);
    socket.emit('send-nextQuestion', {
      room: state.gameData.roomId,
      msg: -1 // start game
    });

    socket.on('listen-nextQuestion', (msgIndex) => {
      // setinfo(JSON.stringify(msg));
      if (Number(msgIndex) < 0) return;
      setI(msgIndex);
      console.log('mess from server: ', msgIndex);
      if (msgIndex < numberOfQuestion) {
        // setIsDisable(false);
      } else {
        console.log('else case i: ', msgIndex);
        handleEndGame();
      }
      setChartData([...initChart]);
    });

    socket.on('listen-answer-chart', (ansChartData) => {
      console.log('player anwser: ', ansChartData);
      const newChart = [
        { type: 'A', answers: ansChartData.A },
        { type: 'B', answers: ansChartData.B },
        { type: 'C', answers: ansChartData.C },
        { type: 'D', answers: ansChartData.D }
      ];
      setChartData([...newChart]);
    });

    // // TODO: Gửi message qua student số thứ tự câu hỏi
    // socket.emit('student-sender', {
    //   room: pin,
    //   msg: currentQuestion
    // });
    // TODO: Lắng nghe đáp án student
    // socket.on('teacher-receiver', (msg) => {
    //   const index = chartData.findIndex((item) => item.type === msg.ans);
    //   const newData = [...chartData];
    //   if ([0, 1, 2, 3].includes(index)) {
    //     newData[index].answers = chartData[index].answers + 1;
    //   }
    //   setChartData([...newData]);
    // });
    // setCounter(questions[currentQuestion].time);
  }, []);

  const handleMoveQuestion = () => {
    // if (currentQuestion < numberOfQuestion - 1) {
    //   dispatch(nextQuestion({ id: currentQuestion + 1 }));
    //   setChartData(initChart);
    // }
    if (i + 1 < numberOfQuestion) {
      setI(i + 1);
      setChartData([...initChart]);
      socket.emit('send-nextQuestion', {
        room: state.gameData.roomId,
        msg: i + 1
      });
    }
  };
  const handleFinishGame = () => {
    // socket.emit('student-sender', {
    //   room: pin,
    //   msg: currentQuestion + 1
    // });
    // navigate('/presentation');
    setI(i + 1);
    handleEndGame();
    socket.emit('send-nextQuestion', {
      room: state.gameData.roomId,
      msg: i + 1
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
    // if (!isHost) return <div />;
    if (index < numberOfQuestion - 1) {
      return <Button onClick={() => handleMoveQuestion()}>{`${index + 1}/${numberOfQuestion}: Next`}</Button>;
    }
    return <Button onClick={() => handleFinishGame()}>{`${index + 1}/${numberOfQuestion}: Endgame`}</Button>;
  };

  return (
    <BasicLayout>
      <section className='courses'>
        <p className='btn'>{state.presenData.name}</p>
        <div className='site-card-border-less-wrapper'>
          {i >= numberOfQuestion ? (
            <ResultView resultData={resultData} />
          ) : (
            <Card
              title={questionList.current[i].content}
              bordered={false}
              extra={getCardButton(i)}
              style={{
                height: 600,
                width: '100%'
              }}
            >
              <Column {...config} height={300} />
              <div style={{ marginTop: '100px' }} />
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
      </section>
    </BasicLayout>
  );
};

export default HostLiveGame;
