import React, { useEffect, useState, useRef } from 'react';
import { getPresentationByPin } from '../../API/preRequest';
import { io } from 'socket.io-client';
export default function StudentPage() {
  const socket = useRef();

  const [question, setQuestion] = useState();
  const [pin, setPin] = useState('RzTRwU');
  const [message, setMessage] = useState('messsage here!!!');
  const [info, setInfo] = useState('Info here!!!');
  const questions = useRef();

  useEffect(() => {
    const getData = async () => {
      socket.current = io('http://localhost:5001');
      socket.current.emit('add-user', 'Studentoan');
      // nghe student sender , nghe thứ tự câu
      socket.current.on('student-receiver', (msg) => {
        setInfo(msg);
        setQuestion(questions.current[msg]);
      });
    };
    getData();
  }, []);

  const join = async () => {
    //check isOpen => true + tên không tồn tại => trả về presentation
    const { data } = await getPresentationByPin(pin);

    socket.current.emit('join-room', {
      name: 'Studentoan',
      room: pin,
    });
    questions.current = data.data.questions;
    setInfo(JSON.stringify(questions.current));
  };

  const sendi = () => {
    //gửi câu trả lời tới teacher
    socket.current.emit('teacher-sender', {
      room: pin,
      msg: { username: 'Studentoan', ans: 'A' }, //msg tự custom
    });
    setMessage('dasdasdadad');
  };
  const pinOnChange = (event) => {
    setPin(event.target.value);
  };
  return (
    <div>
      <h1>Student</h1>
      <h1>
        <input id='username' type='text' value={pin} onChange={pinOnChange} />
      </h1>
      <h1>
        <button onClick={join}>Join</button>
      </h1>
      <h1>
        <button>do something</button>
      </h1>
      {question && (
        <h1>
          <h1>{question.content}</h1>
          <button onClick={sendi}>{question.ansA}</button>
          <button onClick={sendi}>{question.ansB}</button>
          <button onClick={sendi}>{question.ansC}</button>
          <button onClick={sendi}>{question.ansD}</button>
        </h1>
      )}

      <h1>{message}</h1>
      <h1>{info}</h1>
    </div>
  );
}
