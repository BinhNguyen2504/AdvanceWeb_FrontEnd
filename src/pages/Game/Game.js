/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import WaitingRoom from '../WaitingRoom';

const serverHost = 'http://localhost:3000';

const GamePage = () => {
  const { gamePin } = useParams();
  const socketRef = useRef();
  const [id, setId] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [answer, setAnswer] = useState({ a: 0, b: 0, c: 0 })

  useEffect(() => {
    console.log("start use effect")
    socketRef.current = socketIOClient.connect(serverHost);
    socketRef.current.on('connection', () => {
      console.log("connected to host")
    });
    socketRef.current.on('getId', (data) => {
      setId(data);
      console.log('id: ', id);
    });

    socketRef.current.on('sendDataServer', (dataGot) => {
      console.log('server send: ', dataGot);
    });

    socketRef.current.on('get-answer-from-player', (data, player) => {
      console.log('data: ', data);
      console.log('player: ', player);
      const ans = data.answer
      // const newValue = answer[ans] += 1
      console.log("ans: ", answer)
      // setAnswer(prev => ({...prev, ans: newValue})
      setAnswer({ a: 0, b: 0, c: 10 })
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const addNewGame = () => {
    const game = { pin: "123" };
    socketRef.current.emit("init-game", game)
    setIsGameStarted((prevstate) => !prevstate);
  };

  const startGame = () => {
    socketRef.current.emit("start-game", "quiz")
    // setIsGameStarted((prevstate) => !prevstate);
  };

  return (
    <div>
      <div>
        <button onClick={addNewGame}>Start init game</button>
      </div>
      <div>
        <button onClick={startGame}>Start a game</button>
      </div>
      {!isGameStarted && (
        <div>
          <WaitingRoom pin='123' socket={socketRef.current} />
          <button onClick={startGame}>Start a game</button>
        </div>
      )}
      <p>{gamePin}</p>
      <div>a: { answer.a }</div>
      <div>b: { answer.b }</div>
      <div>c: { answer.c }</div>
    </div>
  );
};

export default GamePage;
