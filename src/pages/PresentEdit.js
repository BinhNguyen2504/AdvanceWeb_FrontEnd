import { useState } from 'react';
import Title from 'antd/es/typography/Title';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { useCreatePresentMutation, useGetPresentQuery } from '../app/presentationService';
import BasicLayout from '../layouts/BasicLayout';
import { useNavigate } from 'react-router-dom';

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
  const [createPresent, createPresentResult] = useCreatePresentMutation();

  const { data, isLoading } = useGetPresentQuery(presentId, {
    skip: !presentId
  });

  const handleChangeTitle = () => {
    setFormData((form) => ({
      questions: form.questions,
      name: value
    }));
  };
  const handleChangeQuestion = (e) => {
    const newData = { ...formData };
    newData.questions[currentIndex].content = e.target.value;
    setFormData(newData);
  };
  const handleChangeAnswer = (e, type) => {
    const newData = { ...formData };
    newData.questions[currentIndex][type] = e.target.value;
    setFormData(newData);
  };
  const handleChangeTime = (value) => {
    const newData = { ...formData };
    newData.questions[currentIndex].time = value;
    setFormData(newData);
  };
  const handleChangeKey = (value) => {
    const newData = { ...formData };
    newData.questions[currentIndex].trueAns = value;
    setFormData(newData);
  };
  const handleCreateNewSlide = () => {
    const newData = { ...formData };
    newData.questions.push({ ...initialQuestion });
    setFormData(newData);
    setCurrentIndex(formData.questions.length - 1);
  };
  const handleSubmit = async () => {
    const result = await createPresent(formData);
    if (result) {
      console.log(result);
      navigate('/presentation');
    }
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
              {formData.questions.map((ques, index) => (
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

                <Button type='primary' className='btn' onClick={handleSubmit}>
                  Create Presentation
                </Button>
              </div>
            </Col>
          </Row>
        </section>
      )}
    </BasicLayout>
  );
};
export default PresentEdit;
