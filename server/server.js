const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');


// Thiết lập middleware để phục vụ các tệp tĩnh từ build React

// Định tuyến cho API (Ví dụ: API đơn giản)
app.get('/api', (req, res) => {
  res.json({ message: "Hello from Expr ss!" });
});
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] }));



console.log ('connection setup');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // URL of the React app
        methods: ["GET", "POST"],       // Allowed HTTP methods
        credentials: true               // Allow credentials (if needed)
    }
  });
// Thiết lập socket.io để gửi dữ liệu cho client
io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Gửi một thông điệp đến client sau khi kết nối
    socket.emit('server-message', 'Hello from server!');
  
    // Xử lý các sự kiện khác từ client (nếu có)
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
app.use(express.static(path.join(__dirname, '../client/build')));
// Xử lý route cho React sau khi build
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

// Cấu hình port cho server Express
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});