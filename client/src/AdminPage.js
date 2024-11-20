import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Modal from './Modal'; // Import the Modal component

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [audioQuestion, setAudioQuestion] = useState('http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg');
  const [textQuestion, settextQuestion] = useState('Can you hear me');
  const [delayToShow, setDelayToShow] = useState(5);
  const [maxTimes, setMaxTimes] = useState(2);
  const [socket, setSocket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Kết nối với server WebSocket
    const API_URL = process.env.REACT_APP_API_ORIGIN || 'https://megastar-best-listener-game-fe.onrender.com';
    console.log(`API_URL: ${API_URL}`)
    const socket = io(API_URL);
    setSocket(socket);

    socket.on('server-message', (data) => {
      console.log("geted message server-message");
      setMessage(data);
    });


    // Cleanup khi component bị unmount
    return () => {
      console.log("close connect");
      socket.disconnect();
    };
  }, []);


  const sendMessage = () => {
    if (socket) {
      socket.emit('admin-send-question', {
        audioQuestion,
        textQuestion,
        delayToShow,
        maxTimes
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal showModal={showModal} handleCloseModal={handleCloseModal} />

      <h1>Admin Page</h1>
      <p>{message}</p>

      <div className="mb-3">
        <label htmlFor="textQuestion" className="form-label">
          Question:
        </label>
        <input
          type="text"
          className="form-control"
          id="textQuestion"
          value={textQuestion}
          onChange={(e) => settextQuestion(e.target.value)}
          placeholder="Enter your question"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="audioQuestion" className="form-label">
          Audio Link:
        </label>
        <input
          type="text"
          className="form-control"
          id="audioQuestion"
          value={audioQuestion}
          onChange={(e) => setAudioQuestion(e.target.value)}
          placeholder="Enter audio link"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="delayToShow" className="form-label">
          Seconds delay to show:
        </label>
        <input
          type="text"
          className="form-control"
          id="delayToShow"
          value={delayToShow}
          onChange={(e) => setDelayToShow(e.target.value)}
          placeholder="Enter seconds delay to show"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="maxTimes" className="form-label">
          Max times:
        </label>
        <input
          type="text"
          className="form-control"
          id="maxTimes"
          value={maxTimes}
          onChange={(e) => setMaxTimes(e.target.value)}
          placeholder="Enter max times run"
        />
      </div>

      <button className="btn btn-primary" onClick={sendMessage}>SendMessage</button>
    </div>
  );
};

export default AdminPage;
