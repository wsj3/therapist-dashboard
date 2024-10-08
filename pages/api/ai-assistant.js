import { Server } from 'socket.io';

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
    res.end();
    return;
  }

  console.log('Socket is initializing');
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (data) => {
      console.log('Message received:', data);
      // Process the message and generate a response
      const response = `AI Assistant: You said "${data}"`;
      socket.emit('response', response);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  console.log('Socket is set up');
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};