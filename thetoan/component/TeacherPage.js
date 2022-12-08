import React, { useEffect, useState, useRef } from 'react';
import { teacherGetPresentation, createGame, updateRoom } from '../../API/preRequest';
import { io } from 'socket.io-client';
export default function TeacherPage() {
  const socket = useRef();
  const gameData = useRef();
  const [presentId, setPresentId] = useState('638e34ed751902f9b36da8e2');
  const [question, setQuestion] = useState();
  const [message, setMessage] = useState('messsage here!!!');
  const [receive, setReceive] = useState();
  const questions = useRef();
  const i = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getData = async () => {
      socket.current = io('http://localhost:5001');
      socket.current.emit('add-user', 'tranthetoan');

      //? Lắng nghe đáp án student
      socket.current.on('teacher-receiver', (msg) => {
        setReceive(JSON.stringify(msg));
      });

      //? Lắng nghe người tham gia
      socket.current.on('join-room-receiver', (msg) => {
        setReceive(msg);
      });
    };
    getData();
  }, []);

  const create = async () => {
    //? tạo game : trả về
    i.current = 0;
    const { data } = await createGame({
      presentationId: presentId
    });

    //? danh sách các câu hỏi
    gameData.current = data.data;
    //setMessage(JSON.stringify(data.data));

    //? gọi lên socket tạo phòng
    socket.current.emit('create-room', {
      //  Tên định danh socket - duy nhất - có thể dùng id hoặc user name
      name: 'tranthetoan',
      room: data.data.pin
    });
    questions.current = data.data.presentation.questions;
    setMessage(JSON.stringify(data.data.pin));
  };
  const start = async () => {
    //update game. isOpen =  false
    const { data } = await updateRoom(gameData.current.pin, false);
    setMessage(JSON.stringify(data.data));

    //gửi message qua student số thứ tụ câu hỏi
    socket.current.emit('student-sender', {
      room: gameData.current.pin,
      msg: i.current
    });
    setQuestion(questions.current[i.current]);
    setMessage(i.current);
    // socket.current.emit('start-room', '638b150d3e3d7cf25e187ef2');
  };

  const next = () => {
    i.current++;
    if (i.current < questions.current.length) {
      setMessage(i.current);
      setQuestion(questions.current[i.current]);

      //
      socket.current.emit('student-sender', {
        room: gameData.current.pin,
        msg: i.current
      });
    }
    setReceive('');
  };

  const send = () => {
    // để test
    socket.current.emit('student-sender', {
      room: '638b150d3e3d7cf25e187ef2',
      msg: Math.random()
    });
  };

  const presentIdOnChange = (event) => {
    setPresentId(event.target.value);
  };
  return (
    <div>
      <h1>Teacher</h1>
      <h1>
        <input id='username' type='text' value={presentId} onChange={presentIdOnChange} />
      </h1>
      <h1>
        <button onClick={create}>Creat test</button>
        <button onClick={start}>Start</button>
      </h1>

      <h1>
        <button onClick={send}>Sent student</button>
      </h1>
      {question && (
        <h1>
          <h1>{question.content}</h1>
          <button>{question.ansA}</button>
          <button>{question.ansB}</button>
          <button>{question.ansC}</button>
          <button>{question.ansD}</button>
        </h1>
      )}

      <button onClick={next}>Next</button>
      <h1>{message}</h1>
      <h1>{receive}</h1>
    </div>
  );
}
