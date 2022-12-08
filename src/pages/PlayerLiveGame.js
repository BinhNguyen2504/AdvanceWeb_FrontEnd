import { Button, Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion } from '../app/gameSlice';
import BasicLayout from '../layouts/BasicLayout';

const PlayerLiveGame = () => {
  const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
  const { socket } = useSelector((state) => state.socket);
  const { username } = useSelector((state) => state.auth);
  const [isDisable, setIsDisable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('student-receiver', (msg) => {
      if (msg < numberOfQuestion) {
        dispatch(nextQuestion({ id: msg }));
      }
    });
    setIsDisable(false);
  }, [currentQuestion]);

  const sendAnswer = (answer) => {
    socket.emit('teacher-sender', {
      room: pin,
      msg: { username, ans: answer }
    });
    setIsDisable(true);
  };

  return (
    <BasicLayout>
      <section className='courses'>
        <p className='btn'>{name}</p>
        <div className='site-card-border-less-wrapper'>
          <Card
            title={questions[currentQuestion].content}
            bordered={false}
            style={{
              height: 300,
              width: '100%'
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button block onClick={() => sendAnswer('A')} disabled={isDisable}>
                  {`A: ${questions[currentQuestion].ansA}`}
                </Button>
              </Col>
              <Col span={12}>
                <Button block onClick={() => sendAnswer('B')} disabled={isDisable}>
                  {`B: ${questions[currentQuestion].ansB}`}
                </Button>
              </Col>
              <Col span={12}>
                <Button block onClick={() => sendAnswer('C')} disabled={isDisable}>
                  {`C: ${questions[currentQuestion].ansC}`}
                </Button>
              </Col>
              <Col span={12}>
                <Button block onClick={() => sendAnswer('D')} disabled={isDisable}>
                  {`D: ${questions[currentQuestion].ansD}`}
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </section>
    </BasicLayout>
  );
};
export default PlayerLiveGame;
