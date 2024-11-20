import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const PlayerPage = () => {

    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [initializeSocket, setInitializeSocket] = useState(false);
    const [delayToShow, setDelayToShow] = useState(10000);
    const [audioQuestion, setAudioQuestion] = useState('');
    const [isRunningAudio, setIsRunningAudio] = useState(false);
    const [maxTimes, setMaxTimes] = useState(0);
    
    const joinPlayerRoom = () => {
        const roomName = 'playerRoom';
        if (socket) {
            socket.emit('joinRoom', roomName);  // Join the specified room
            console.log(`Joined room: ${roomName}`);
        } else {
            alert('No socket connected');
        }
    };

    const handlePlayMusic = () => {
        setIsRunningAudio(true);
        setMaxTimes(maxTimes-1);
        if (audioQuestion) {
            const audio = new Audio(audioQuestion);
            audio.addEventListener('ended', () => {
                setIsRunningAudio(false); 
                console.log('Audio playback completed');
              });
            audio.play();
        } else {
            setIsRunningAudio(false);
            console.log('No audio file to play');
        }
    };

    const connectToServer = () => {
        const roomName = 'playerRoom';
        // Kết nối với server WebSocket
        const API_URL = process.env.REACT_APP_API_ORIGIN || 'https://megastar-best-listener-game-fe.onrender.com';
        console.log(`API_URL: ${API_URL}`)
        const socket = io(API_URL);
        setSocket(socket);
        

        socket.on('server-message', (data) => {
            console.log("geted message server-message");
            setMessage(data);
        });

        socket.on('show-question', (data) => {
            console.log(JSON.stringify(data));
            const { audioQuestion, textQuestion, delayToShow, maxTimes } = data;
            setDelayToShow(delayToShow);
            setAudioQuestion(audioQuestion);
            setIsButtonDisabled(true);
            setMaxTimes(maxTimes);
            let countdown = delayToShow;
            const timer = setInterval(() => {
                countdown -= 1;
                setDelayToShow(countdown);
                if (countdown <= 0) {
                  clearInterval(timer);
                  setIsButtonDisabled(false); // Enable the button when countdown finishes
                }
              }, 1000);
        });

        socket.emit('joinRoom', roomName);  // Join the specified room
        socket.on ('joinedRoom', (data)=>{
            setInitializeSocket(true);
        });

        

        // Cleanup khi component bị unmount
        return () => {
            console.log("close connect");
            socket.disconnect();
        };
    };


    return <>

        <button className="btn btn-primary" onClick={connectToServer} disabled={initializeSocket} >
            {initializeSocket ? 'Connected server': 'Connect to server'}
        </button>
        <h1>Music Player with Countdown</h1>
        <p>Countdown: {delayToShow > 0 ? delayToShow : 'Ready!'}</p>
        <h1>You have {maxTimes} to listen</h1>
        <button className="btn btn-primary" onClick={handlePlayMusic} disabled={isRunningAudio || isButtonDisabled || maxTimes<=0 }>
            {isButtonDisabled ? 'Waiting...' : 'Play Music'}
        </button>
    </>;
};

export default PlayerPage