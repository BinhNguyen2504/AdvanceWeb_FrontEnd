import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion } from '../app/gameSlice';
import BasicLayout from '../layouts/BasicLayout';

const HostLiveGame = () => {
  const initChart = [
    { type: 'A', answers: 0 },
    { type: 'B', answers: 0 },
    { type: 'C', answers: 0 },
    { type: 'D', answers: 0 }
  ];
  const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState(initChart);

  useEffect(() => {
    // TODO: Gửi message qua student số thứ tự câu hỏi
    socket.emit('student-sender', {
      room: pin,
      msg: currentQuestion
    });
    setChartData(initChart);
  }, [currentQuestion]);
  useEffect(() => {
    // TODO: Lắng nghe đáp án student
    socket.on('teacher-receiver', (msg) => {
      const index = chartData.findIndex((item) => item.type === msg.ans);
      const newData = [...chartData];
      console.log(index);
      if ([0, 1, 2, 3].includes(index)) {
        newData[index].answers = chartData[index].answers + 1;
      }
      setChartData([...newData]);
    });
  }, []);

  const handleMoveQuestion = () => {
    if (currentQuestion < numberOfQuestion - 1) {
      dispatch(nextQuestion({ id: currentQuestion + 1 }));
    }
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

  return (
    <BasicLayout>
      <section className='courses'>
        <p className='btn'>{name}</p>
        <div className='site-card-border-less-wrapper'>
          <Card
            title={questions[currentQuestion].content}
            bordered={false}
            extra={
              currentQuestion < numberOfQuestion - 1 ? (
                <Button onClick={handleMoveQuestion}>Next</Button>
              ) : (
                <Button>Endgame</Button>
              )
            }
            style={{
              height: 600,
              width: '100%'
            }}
          >
            <Column {...config} height={300} />
            <div style={{ marginTop: '100px' }} />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button block>{`A: ${questions[currentQuestion].ansA}`}</Button>
              </Col>
              <Col span={12}>
                <Button block>{`B: ${questions[currentQuestion].ansB}`}</Button>
              </Col>
              <Col span={12}>
                <Button block>{`C: ${questions[currentQuestion].ansC}`}</Button>
              </Col>
              <Col span={12}>
                <Button block>{`D: ${questions[currentQuestion].ansD}`}</Button>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
    </BasicLayout>
  );
};

export default HostLiveGame;
