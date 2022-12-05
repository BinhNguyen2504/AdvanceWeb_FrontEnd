/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

function WaitingRoom({ pin, socket }) {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.on('player-added', (player) => {
      setPlayerList([...playerList, player]);
    });
  }, [playerList, socket]);

  return (
    <div>
      <h1>Waiting room</h1>
      <h2>Pin {pin}</h2>
      <div>
        <div>
          <h1>Player List</h1>
          {playerList.length > 0 ? (
            <ol>
              {playerList.map((player) => (
                <li>
                  <mark>{player.userName}</mark>
                  <small>Student</small>
                </li>
              ))}
            </ol>
          ) : (
            <h1>No players yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
