const express = require('express');
const path = require('path');

const app = express();

// Thiết lập middleware để phục vụ các tệp tĩnh từ build React
app.use(express.static(path.join(__dirname, '../client/build')));

// Định tuyến cho API (Ví dụ: API đơn giản)
app.get('/api', (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Xử lý route cho React sau khi build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Cấu hình port cho server Express
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});