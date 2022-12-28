/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-wrap-multilines */
import { Column } from '@ant-design/plots';
import { Button, Card, Col, Row, DatePicker, Drawer, Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    setOpenQuestion(true);
  };
  const onCloseChat = () => {
    setOpenQuestion(false);
  };
  const initChart = [
    { type: 'A', answers: 0 },
    { type: 'B', answers: 0 },
    { type: 'C', answers: 0 },
    { type: 'D', answers: 0 }
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, questions, currentQuestion, numberOfQuestion, pin } = useSelector((state) => state.game);
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

  const handleMoveQuestion = () => {
    if (currentQuestion < numberOfQuestion - 1) {
      dispatch(nextQuestion({ id: currentQuestion + 1 }));
      setChartData(initChart);
    }
  };
  const handleFinishGame = () => {
    socket.emit('student-sender', {
      room: pin,
      msg: currentQuestion + 1
    });
    navigate('/presentation');
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
      <>
        <Button type='primary' onClick={showQuestionDrawer} icon={<PlusOutlined />}>
          Question
        </Button>
        <Drawer
          title='Question for Presentation'
          width={720}
          onClose={onCloseQuestion}
          open={openQuestion}
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
      </>
      <>
        <Button type='primary' onClick={showChatDrawer} icon={<PlusOutlined />}>
          Chat
        </Button>
        <Drawer
          title='Chat for Presentation'
          width={720}
          onClose={onCloseChat}
          placement="left"
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
      </>
      <section className='courses'>
        <p className='btn'>name j do</p>
        <div className='site-card-border-less-wrapper'>
          {/* <Card
            title={questions[currentQuestion].content}
            bordered={false}
            extra={
              currentQuestion < numberOfQuestion - 1 ? (
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
            <div style={{ marginTop: '100px' }} />
            <Row gutter={[16, 16]}>
              <Col span={24}>
                Time:
                {1221}
              </Col>
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
          </Card> */}
        </div>
      </section>
    </BasicLayout>
  );
};

export default HostLiveGameGroupPage;
