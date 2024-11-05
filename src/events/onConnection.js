import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';

export const onConnection = (socket) => {
  console.log(`Client connected from ${socket.remoteAddress}:${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0);

  //대기중인 소켓 이벤트
  socket.on('data', onData(socket));

  socket.on('end', onEnd(socket));

  socket.on('error', onError(socket));
};
