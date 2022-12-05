/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable react/button-has-type */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable import/order */
import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import socketIOClient from 'socket.io-client';

const serverHost = 'http://localhost:3000';

function JoinGameClient() {
//   const navigate = useNavigate();
  const user = {
    userName: "toan",
    id: 1,
  }

  const [isPlayerAdded, setIsPlayerAdded] = useState(false)
  const pinRef = useRef('');
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(serverHost);
    console.log("try connect socket")
    socketRef.current.on("move-to-game-page", (gameId) => {
      console.log("move to game id: ", gameId)
    //   navigate(`/game/player/${gameId}/${socketRef.current.id}`, { state: { socket: socketRef.current, user } });
    // navigate(`/game/player/${gameId}/${socketRef.current.id}`, { state: socketRef.current, replace: false })
    })
  }, [])

  const result = (message) => {
    if (message === "correct") {
    //   dispatch(addPlayer(gameId, playerId))
      setIsPlayerAdded(true)
    } else {
      alert("error")
    }
  }

  const joinGame = () => {
    pinRef.current = '123'
    console.log('pin value: ', pinRef.current)
    socketRef.current.emit(
      "add-player",
      user,
      socketRef.current.id,
      pinRef.current,
      (message) => {
        result(message)
      }
    )
  }

  const sendAnswer = async (ans) => {
    console.log("pin: ", pinRef.current)
    const data = {
      gamePin: '123',
      questionIndex: 1,
      answer: ans,
      playerId: user.id,
    }
    console.log("send anwser")
    socketRef.current.emit("send-answer-to-host", data)
  }

  return (
    <div>
      {!isPlayerAdded ? (
        <div>
          <h2>Join game</h2>
          <input
            type="text"
            ref={pinRef}
            placeholder='Write here a pin'
          />
          <button onClick={joinGame}>Join</button>
        </div>
      ) : (
        <div>
          <h2>You joined the game</h2>
          <h4>Waiting on a host to start the game</h4>
        </div>
      )}
      <div>
        <div>
            <button onClick={() => sendAnswer('a')}>Answer: A</button>
        </div>
        <div>
            <button onClick={() => sendAnswer('b')}>Answer: B</button>
        </div>
        <div>
            <button onClick={() => sendAnswer('c')}>Answer: C</button>
        </div>
      </div>
    </div>
  )
}

export default JoinGameClient;
