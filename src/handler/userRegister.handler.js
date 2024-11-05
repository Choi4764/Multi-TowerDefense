import { GamePacket } from '../init/loadProto.js';

// TODO: DB 작업해주고, Response 생성해주고 해당 Response 반환
// payload로 id, password, email 들어옴
// 그냥 {id, password, email} 해줘도 됨
const userRegisterHandler = (payload) => {
  console.log(payload);
  // NOTE: 아래 Response 생성하는 것도 파일 나눠줘야 함.
  const testResponse = {
    registerResponse: {
      success: true,
      message: 'register test',
      failCode: 0, // failCode도 상수로 쓰지 말고 Constants에 작성하기
    },
  };
  const payloadBuffer = GamePacket.encode(GamePacket.create(testResponse)).finish();
  console.log(GamePacket.create(testResponse));
  const header = createHeader(
    payloadBuffer.length,
    PACKET_TYPE.REGISTER_RESPONSE,
    decodedPacket.registerRequest.sequence++,
  );
  const response = Buffer.concat([header, payloadBuffer]);

  socket.write(response);
};

export default userRegisterHandler;
