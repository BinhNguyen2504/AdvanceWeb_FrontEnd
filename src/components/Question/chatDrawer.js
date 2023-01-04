import { Avatar, Button, Form, Input, List, message } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Comment from '@ant-design/compatible/lib/comment';
import VirtualList from 'rc-virtual-list';
import QuestionComment from './questionComment';

const ContainerHeight = 580;
const { TextArea } = Input;
const CommentList = ({ comments, onScroll }) => (
  //   <List
  //     dataSource={comments}
  //     header={`${comments.length} ${comments.length > 1 ? 'questions' : 'question'}`}
  //     itemLayout='horizontal'
  //     renderItem={(props) => <QuestionComment {...props} />}
  //   />
  //   const onScroll = (e) => {
  //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
  //       appendData();
  //     }
  //   };
  <List>
    <VirtualList data={comments} height={ContainerHeight} itemHeight={47} itemKey='email' onScroll={onScroll}>
      {(item) => (
        <List.Item key={item.email}>
          <List.Item.Meta avatar={<Avatar src={item.picture.large} />} title={item.name.last} />
          Contente aefnaownf oằn oăienf oăine foaeikfn ăienf aolwknef alwkne faoken oalknf a
        </List.Item>
      )}
    </VirtualList>
  </List>
);
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
const ChatForm = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment('2016-11-22').fromNow()
        }
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  return (
    <>
      {comments.length > 0 && <CommentList comments={data} onScroll={onScroll} />}
      <Comment
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />}
        content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
      />
    </>
  );
};

export default ChatForm;
