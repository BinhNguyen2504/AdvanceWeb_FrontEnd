/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-wrap-multilines */
import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row, DatePicker, Drawer, Form, Input, Select, Space, Divider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { nextQuestion } from '../../app/gameSlice';
import BasicLayout from '../../layouts/BasicLayout';
import PresentQuestionForm from '../../components/Question/CommonForm';
import QuestionComment from '../../components/Question/questionComment';
import SendQuestionForm from '../../components/Question/sendQuestionForm';
import ChatForm from '../../components/Question/chatDrawer';

const { Option } = Select;

const HostLiveGameGroupPage = () => {
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

  const { state } = useLocation();
  const questionList = useRef(state.presentation.questions);
  const { numberOfQuestion } = state.presentation;
  const [i, setI] = useState(0);

  useEffect(() => {
    console.log('state in live: ', state);
    socket.emit('send-nextQuestion', {
      room: state.roomId,
      msg: -1,
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
      console.log('host emit i: ', i + 1);
      setI(i + 1);
      socket.emit('send-nextQuestion', {
        room: state.roomId,
        msg: i + 1,
      });
    }
  };
  const handleFinishGame = () => {
    console.log('host emit i: ', i + 1);
    socket.emit('send-nextQuestion', {
      room: state.roomId,
      msg: i + 1,
    });
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
  console.log('i current: ', i);
  console.log('question: ', questionList.current);

  return (
    <BasicLayout>
      <section className='courses'>
        <p className='btn'>name j do</p>
        <div className='site-card-border-less-wrapper'>
          { i < 0 ? (<div>{i}</div>) : (
            <Card
              title={questionList.current[i].content}
              bordered={false}
              extra={
            i < numberOfQuestion - 1 ? (
              // <Button onClick={handleMoveQuestion} disabled={counter > 0}>
              //   Next
              // </Button>
              <Button onClick={handleMoveQuestion} disabled={false}>
                Next
              </Button>
            ) : (
              <Button onClick={handleFinishGame} disabled={false}>
                Endgame
              </Button>
            )
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
                  {1221}
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
          extra={(
            <Space>
              <Button onClick={onCloseQuestion}>Cancel</Button>
              <Button onClick={onCloseQuestion} type='primary'>
                Submit
              </Button>
            </Space>
          )}
        >
          {/* <Form layout='vertical' hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='name'
                  label='Name'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter user name'
                    }
                  ]}
                >
                  <Input placeholder='Please enter user name' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='url'
                  label='Url'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter url'
                    }
                  ]}
                >
                  <Input
                    style={{
                      width: '100%'
                    }}
                    addonBefore='http://'
                    addonAfter='.com'
                    placeholder='Please enter url'
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='owner'
                  label='Owner'
                  rules={[
                    {
                      required: true,
                      message: 'Please select an owner'
                    }
                  ]}
                >
                  <Select placeholder='Please select an owner'>
                    <Option value='xiao'>Xiaoxiao Fu</Option>
                    <Option value='mao'>Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='type'
                  label='Type'
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the type'
                    }
                  ]}
                >
                  <Select placeholder='Please choose the type'>
                    <Option value='private'>Private</Option>
                    <Option value='public'>Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name='approver'
                  label='Approver'
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the approver'
                    }
                  ]}
                >
                  <Select placeholder='Please choose the approver'>
                    <Option value='jack'>Jack Ma</Option>
                    <Option value='tom'>Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='dateTime'
                  label='DateTime'
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the dateTime'
                    }
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: '100%'
                    }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name='description'
                  label='Description'
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description'
                    }
                  ]}
                >
                  <Input.TextArea rows={4} placeholder='please enter url description' />
                </Form.Item>
              </Col>
            </Row>
          </Form> */}
          {/* <QuestionComment /> */}
          <SendQuestionForm />
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
          <ChatForm />
        </Drawer>
      </section>
    </BasicLayout>
  );
};

export default HostLiveGameGroupPage;
