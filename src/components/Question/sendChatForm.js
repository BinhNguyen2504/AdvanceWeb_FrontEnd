import { Avatar, Button, Form, Input, List, message } from 'antd';
import React, { useState, useEffect } from 'react';
import Comment from '@ant-design/compatible/lib/comment';
import VirtualList from 'rc-virtual-list';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const ContainerHeight = 580;
const { TextArea } = Input;

const CommentList = ({ comments, onScroll }) => {
  console.log('chat in chatlist: ', comments);
  return (
    <List>
      <VirtualList data={comments} height={ContainerHeight} itemHeight={47} itemKey='email' onScroll={onScroll}>
        {(item) => (
          <List.Item key={`${item.username}_${item.date}_${item.time}`}>
            {/* <List.Item.Meta avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />} title={item.username} /> */}
            {/* <Typography.Text>{`${item.date} ${item.time}`}</Typography.Text>
            <Typography.Text>{item.content}</Typography.Text> */}
            {/* <p>{item.content}</p> */}
            <Comment
              author={item.username}
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt={item.username} />}
              content={item.content}
              datetime={`${item.date} ${item.time}`}
            />
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
const SendChatForm = ({ roomID, username, isHost, status, socket, callNoti }) => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const createMessageAPI = async (body) => {
    const { data } = await API.post('/message/createMessage', body);
    return data;
  };

  const getMessageAPI = async (id) => {
    const { data } = await API.get(`/message/${id}`);
    return data;
  };

  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (!value) return;

    setSubmitting(true);
    setTimeout(async () => {
      setSubmitting(false);
      setValue('');

      const res = await createMessageAPI({ roomId: roomID, username, content: value });
      console.log('chat response api: ', res);
      socket.emit('send-message', {
        room: roomID
      });

      // setComments([res.data, ...comments]);
      message.success('Send question successfully');
    }, 500);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getChatList = async () => {
    const res = await getMessageAPI(roomID);
    // const reversed = res.data.reverse();
    setComments(res.data);
  };

  const callFetchData = () => {
    // getQuestionList();
  };

  useEffect(() => {
    getChatList();
    socket.on('listen-message', (msg) => {
      setComments([...msg]);
      callNoti();
    });
  }, [status]);

  // useEffect(() => {
  //   socket.on('listen-message', (msg) => {
  //     console.log('message chat data: ', msg);
  //     setComments([...msg]);
  //   });
  // }, []);

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

export default SendChatForm;
