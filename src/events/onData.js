import {
  PACKET_TYPE,
  PACKET_TYPE_SIZE,
  VERSION_LENGTH_SIZE,
  SEQUENCE_SIZE,
  PAYLOAD_LENGTH_SIZE,
} from '../constants/header.js';
import userRegisterHandler from '../handler/user/userRegister.handler.js';
import userLoginhandler from '../handler/user/userLogin.handler.js';
import { GamePacket } from '../init/loadProto.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const headerSize = PACKET_TYPE_SIZE + VERSION_LENGTH_SIZE + SEQUENCE_SIZE + PAYLOAD_LENGTH_SIZE;

  while (socket.buffer.length >= headerSize) {
    const packetType = socket.buffer.readUInt16BE(0);
    const versionLength = socket.buffer.readUInt8(PACKET_TYPE_SIZE);
    // 버전 문자열을 포함하는 최종적인 헤더 크기
    const totalHeaderLength = headerSize + versionLength;

    // 전체 패킷이 준비될때까지 반복하게 break
    if (socket.buffer.length < totalHeaderLength) {
      break;
    }

    const versionOffset = PACKET_TYPE_SIZE + VERSION_LENGTH_SIZE;
    // TODO: version 검증
    const version = socket.buffer.toString('utf-8', versionOffset, versionOffset + versionLength);

    const sequenceOffset = versionOffset + versionLength;
    const sequence = socket.buffer.readUInt32BE(sequenceOffset);

    const payloadLengthOffset = sequenceOffset + SEQUENCE_SIZE;
    const payloadLength = socket.buffer.readUInt32BE(payloadLengthOffset);

    // 패킷의 전체 길이 확인
    const packetLength = totalHeaderLength + payloadLength;

    // 버퍼 길이가 패킷 길이보다 짧다면 데이터를 모두 수신할떄까지 while 반복
    if (socket.buffer.length < packetLength) {
      break;
    }

    // 실제 데이터
    const payload = socket.buffer.slice(totalHeaderLength, packetLength);
    // 만약 남은 데이터가 있다면 버퍼에 다시 넣어주는 코드
    socket.buffer = socket.buffer.slice(packetLength);

    // TEST: 패킷 로그
    console.log({ packetType, version, sequence, payloadLength, payload });

    try {
      // 모든 패킷을 GamePacket으로 처리 가능
      const decodedPacket = GamePacket.decode(payload);
      switch (packetType) {
        case PACKET_TYPE.REGISTER_REQUEST:
          console.log(decodedPacket.registerRequest);
          await userRegisterHandler(socket, decodedPacket.registerRequest);
          break;
        case PACKET_TYPE.LOGIN_REQUEST:
          await userLoginhandler(socket, decodedPacket.loginRequest);
          break;
      }
    } catch (err) {
      console.error('패킷 처리 에러:', err);
    }
  }
};
