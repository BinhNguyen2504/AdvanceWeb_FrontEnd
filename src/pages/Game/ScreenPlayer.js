/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import socketIOClient from 'socket.io-client';
// import WaitingRoom from '../WaitingRoom';

// const serverHost = 'http://localhost:3000';

const PlayerScreen = () => {
  const { pin, userid } = useParams();
  console.log(`PIN: ${pin}, player screen: userid: ${userid}`)

  const socketRef = useRef();
  const location = useLocation();
  console.log("location: ", location)
  socketRef.current = location.state.socket
  const user = {
    userName: `name_${userid}`,
    id: userid
  }

  useEffect(() => {
    // socketRef.current = socketIOClient.connect(serverHost);
    socketRef.current.on('connection', () => {
      console.log("connected to host")
    });

    socketRef.current.on('')

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendAnswer = async (ans) => {
    const data = {
      gamePin: pin,
      questionIndex: 1,
      answer: ans,
      playerId: user.id,
    }
    socketRef.current.emit("send-answer-to-host", data)
  }

  return (
    <div>
      <div>
        <button onClick={sendAnswer('a')}>Answer: A</button>
      </div>
      <div>
        <button onClick={sendAnswer('b')}>Answer: B</button>
      </div>
      <div>
        <button onClick={sendAnswer('c')}>Answer: C</button>
      </div>
    </div>
  );
};

export default PlayerScreen;
