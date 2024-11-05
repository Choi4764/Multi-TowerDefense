import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';

export const onConnection = (socket) => {
  console.log(`Client connected from : ${socket.remoteAddress} : ${socket.remotePort}`);
  //소켓에는 클라이언트의 정보가 들어있음
  socket.buffer = Buffer.alloc(0); //아무 크기가 없는 버퍼 객체를 각 클라이언트 소켓에 넣어줌 여기에 데이터를 넣었다 뻇다

  //대기중인 소켓 이벤트
  socket.on('data', onData(socket));

  socket.on('end', onEnd(socket));

  socket.on('error', onError(socket));
};
