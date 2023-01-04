import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';

import { useCreatePresentMutation, useGetPresentQuery, useUpdatePresentMutation } from '../app/presentationService';
import { cancelEditPresent } from '../app/presentationSlice';
import BasicLayout from '../layouts/BasicLayout';

const initialState = {
  name: 'Presentation',
  questions: [
    {
      content: 'Hello',
      ansA: 'A',
      ansB: 'B',
      ansC: 'C',
      ansD: 'D',
      trueAns: null,
      time: 10
    }
  ]
};
const initialQuestion = {
  content: 'Question',
  ansA: 'A',
  ansB: 'B',
  ansC: 'C',
  ansD: 'D',
  trueAns: null,
  time: 10
};

const PresentEdit = () => {
  const [formData, setFormData] = useState(initialState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const presentId = useSelector((state) => state.presentation.presentId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createPresent] = useCreatePresentMutation();
  const [updatePresent] = useUpdatePresentMutation();

  const { data, isLoading } = useGetPresentQuery(presentId, {
    skip: !presentId
  });
  useEffect(() => {
    if (data) {
      const { name, questions } = data.data;
      setFormData({ name, questions });
    }
    return () => dispatch(cancelEditPresent());
  }, [data]);

  const handleChangeTitle = (value) => {
    setFormData((form) => ({
      questions: form.questions,
      name: value
    }));
  };
  const handleChangeQuestion = (e) => {
    const newData = { ...formData };
    const questions = [...newData.questions];
    const currentQuestion = { ...newData.questions[currentIndex] };
    currentQuestion.content = e.target.value;
    questions[currentIndex] = currentQuestion;
    newData.questions = questions;
    setFormData(newData);
  };
  const handleChangeAnswer = (e, type) => {
    const newData = { ...formData };
    const questions = [...newData.questions];
    const currentQuestion = { ...newData.questions[currentIndex] };
    currentQuestion[type] = e.target.value;
    questions[currentIndex] = currentQuestion;
    newData.questions = questions;
    setFormData(newData);
  };
  const handleChangeTime = (value) => {
    const newData = { ...formData };
    const questions = [...newData.questions];
    const currentQuestion = { ...newData.questions[currentIndex] };
    currentQuestion.time = value;
    questions[currentIndex] = currentQuestion;
    newData.questions = questions;
    setFormData(newData);
  };
  const handleChangeKey = (value) => {
    const newData = { ...formData };
    const questions = [...newData.questions];
    const currentQuestion = { ...newData.questions[currentIndex] };
    currentQuestion.trueAns = value;
    questions[currentIndex] = currentQuestion;
    newData.questions = questions;
    setFormData(newData);
  };
  const handleCreateNewSlide = () => {
    const newData = { ...formData };
    const questions = [...newData.questions];
    questions.push({ ...initialQuestion });
    newData.questions = questions;
    setFormData(newData);
    setCurrentIndex(formData.questions.length - 1);
  };
  const handleSubmit = async () => {
    if (presentId) {
      await updatePresent({ id: presentId, questions: formData.questions });
    } else {
      await createPresent(formData);
    }
    navigate('/presentation');
  };

  return (
    <BasicLayout>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <section className='courses'>
          <Row>
            <Col span={6}>
              <h1>Slide list</h1>
              {Array.isArray(formData.questions) &&
                formData.questions.map((ques, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Button key={index} style={{ width: '90%' }} onClick={() => setCurrentIndex(index)}>
                    {ques.content}
                  </Button>
                ))}
            </Col>
            <Col span={18}>
              <div className='site-card-border-less-wrapper'>
                <Title
                  editable={{
                    text: formData.name,
                    onChange: handleChangeTitle
                  }}
                >
                  {formData.name}
                </Title>
                <Card
                  title={formData.questions[currentIndex].content}
                  bordered={false}
                  extra={<Button onClick={handleCreateNewSlide}>New slide</Button>}
                  style={{
                    width: '100%'
                  }}
                >
                  <Form name='create' layout='vertical' autoComplete='off'>
                    <Input
                      placeholder='Question'
                      type='text'
                      required
                      className='box'
                      value={formData.questions[currentIndex].content}
                      onChange={handleChangeQuestion}
                    />
                    <Input
                      placeholder='A: ...'
                      type='text'
                      required
                      className='box'
                      value={formData.questions[currentIndex].ansA}
                      onChange={(e) => handleChangeAnswer(e, 'ansA')}
                    />

                    <Input
                      placeholder='B: ...'
                      type='text'
                      required
                      className='box'
                      value={formData.questions[currentIndex].ansB}
                      onChange={(e) => handleChangeAnswer(e, 'ansB')}
                    />
                    <Input
                      placeholder='C: ...'
                      type='text'
                      required
                      className='box'
                      value={formData.questions[currentIndex].ansC}
                      onChange={(e) => handleChangeAnswer(e, 'ansC')}
                    />
                    <Input
                      placeholder='D: ...'
                      type='text'
                      required
                      className='box'
                      value={formData.questions[currentIndex].ansD}
                      onChange={(e) => handleChangeAnswer(e, 'ansD')}
                    />
                    <Select
                      defaultValue='5'
                      style={{ width: 120 }}
                      options={[
                        { value: '5', label: '5' },
                        { value: '10', label: '10' },
                        { value: '15', label: '15' }
                      ]}
                      value={formData.questions[currentIndex].time}
                      onChange={handleChangeTime}
                    />
                    <Select
                      placeholder='True Answer'
                      showSearch
                      style={{ width: 200 }}
                      options={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B' },
                        { value: 'C', label: 'C' },
                        { value: 'D', label: 'D' }
                      ]}
                      value={formData.questions[currentIndex].trueAns}
                      onChange={handleChangeKey}
                    />
                  </Form>
                </Card>
                {presentId ? (
                  <Button type='primary' className='btn' onClick={handleSubmit}>
                    Edit Presentation
                  </Button>
                ) : (
                  <Button type='primary' className='btn' onClick={handleSubmit}>
                    Create Presentation
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </section>
      )}
    </BasicLayout>
  );
};
export default PresentEdit;
