const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let connectedUsers = 0;

io.on('connection', (socket) => {
  connectedUsers++;
  io.emit('user-count', connectedUsers);

  socket.on('disconnect', () => {
    connectedUsers--;
    io.emit('user-count', connectedUsers);
  });
});

server.listen(3000, () => {
  console.log('Servidor Socket.IO en puerto 3000');
});