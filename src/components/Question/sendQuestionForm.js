import { Avatar, Button, Form, Input, List, message } from 'antd';
import React, { useState, useEffect } from 'react';
import Comment from '@ant-design/compatible/lib/comment';
import VirtualList from 'rc-virtual-list';
import axios from 'axios';
import QuestionComment from './questionComment';
import { BASE_URL } from '../../constants';

const ContainerHeight = 580;
const { TextArea } = Input;

const CommentList = ({ comments, onScroll, isHost, callback, viewer }) => {
  console.log('comments in commentList: ', comments);
  return (
    <List>
      <VirtualList data={comments} height={ContainerHeight} itemHeight={47} itemKey='email' onScroll={onScroll}>
        {(item) => (
          <List.Item key={item.email}>
            <QuestionComment question={item} isHost={isHost} callback={callback} viewer={viewer} />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType='submit' loading={submitting} onClick={onSubmit} type='primary' style={{ marginTop: '10px' }}>
        Add Question
      </Button>
    </Form.Item>
  </>
);
const SendQuestionForm = ({ roomID, username, isHost, status }) => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const getQuestionListAPI = async (id) => {
    const { data } = await API.get(`/question/getquestion/${id}`);
    return data;
  };

  const postQuestionAPI = async (body) => {
    const { data } = await API.post('question/createQuestion', body);
    return data;
  };

  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  // const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);
    setTimeout(async () => {
      setSubmitting(false);
      setValue('');
      const res = await postQuestionAPI({
        roomId: roomID,
        username,
        content: value
      });

      setComments([res.data, ...comments]);
      message.success('Send question successfully');
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getQuestionList = async () => {
    const res = await getQuestionListAPI(roomID);
    const reversed = res.data.reverse();
    setComments(reversed);
  };

  const callFetchData = () => {
    getQuestionList();
  };

  useEffect(() => {
    getQuestionList();
  }, [status]);

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      // callFetchData();
    }
  };

  return (
    <>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          onScroll={onScroll}
          isHost={isHost}
          callback={callFetchData}
          viewer={username}
        />
      )}
      <Comment
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
        content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
      />
    </>
  );
};

export default SendQuestionForm;
