import { onData } from './onData.js';

export const onConnection = (socket) => {
  console.log(`Client connected from: ${socket.remoteAddress}:${socket.remotePort}`);
  socket.buffer = Buffer.alloc(0);

  socket.on('data', onData(socket));
};
