/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { createElement, useState } from 'react';
import { CheckCircleOutlined, CheckCircleTwoTone, DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Typography } from 'antd';
import Comment from '@ant-design/compatible/lib/comment';

import './comment.css';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const QuestionComment = ({ question, isHost, callback, viewer }) => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const sendMarkAnswerd = async (questionID) => {
    const { data } = await API.put(`/question/${questionID}`);
    return data;
  };

  const upvoteApi = async (body) => {
    const { data } = await API.put('question/vote', body);
    return data;
  };

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = async () => {
    const res = await upvoteApi({ id: question._id, voter: viewer });
    if (res.data === 'vote success') {
      setAction('liked');
    } else {
      setAction('disliked');
    }
    callback();
    // setLikes(1);
    // setDislikes(0);
    // setAction('liked');
  };
  // const dislike = () => {
    // setLikes(0);
    // setDislikes(1);
    // setAction('disliked');
  // };
  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{question.totalVote}</span>
      </span>
    </Tooltip>,
    // <Tooltip key='comment-basic-dislike' title='Dislike'>
    //   <span onClick={dislike}>
    //     {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
    //     <span className='comment-action'>{dislikes}</span>
    //   </span>
    // </Tooltip>,
    <span key='comment-basic-reply-to'>Reply to</span>
  ];

  const handleClick = async () => {
    if (!isHost) return;
    const res = await sendMarkAnswerd(question._id);
    if (res.success) {
      // setMarked(!marked);
      console.log('call marked');
      callback();
    }
  };

  const getMarkIcon = (quest) => {
    if (!isHost) return <div />;
    return quest.isAnswered ? <Tooltip title='Unmark'><CheckCircleTwoTone twoToneColor="#52c41a" /></Tooltip> : <Tooltip title='Mark'><CheckCircleOutlined twoToneColor="#52c41a" /></Tooltip>;
  };

  return (
    <Comment
      actions={actions}
      author={question.username}
      avatar={<Avatar src='https://joeschmoe.io/api/v1/random' alt={question.username} />}
      content={(
        <>
          <Typography.Text delete={question.isAnswered}>
            {question.content}
          </Typography.Text>
          {/* {question.isAnswered ? <Tooltip title='Unmark'><CheckCircleTwoTone twoToneColor="#52c41a" /></Tooltip> : <Tooltip title='Mark'><CheckCircleOutlined twoToneColor="#52c41a" /></Tooltip> } */}
          <Typography.Text>
            {' '}
          </Typography.Text>
          {getMarkIcon(question)}
        </>
      )}
      datetime={(
        <Tooltip title='2016-11-22 11:22:33'>
          <span>{question.createdAt}</span>
        </Tooltip>
      )}
      onClick={() => handleClick()}
    />
  );
};
export default QuestionComment;
