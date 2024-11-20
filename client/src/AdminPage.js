import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const AdminPage = () => {
  const [message, setMessage] = useState('');

  console.log ('start connect');
  useEffect(() => {
    
    // Kết nối với server WebSocket
    const API_URL = process.env.REACT_APP_API_ORIGIN || 'https://megastar-best-listener-game-fe.onrender.com';
    console.log (`API_URL: ${API_URL}`)
    const socket = io(API_URL);
    socket.on('server-message', (data) => {
      setMessage(data);
    });

    // Cleanup khi component bị unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  console.log ('done connect');

  return (
    <div>
      <h1>Admin Page 1</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminPage;
