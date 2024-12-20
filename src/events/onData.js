import {
  PACKET_TYPE_SIZE,
  VERSION_LENGTH_SIZE,
  SEQUENCE_SIZE,
  PAYLOAD_LENGTH_SIZE,
  PACKET_TYPE,
} from '../constants/header.js';
import { getProtoTypeNameByPacketType } from '../handler/index.js';
import { GamePacket } from '../init/loadProtos.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const headerSize = PACKET_TYPE_SIZE + VERSION_LENGTH_SIZE + SEQUENCE_SIZE + PAYLOAD_LENGTH_SIZE;

  while (socket.buffer.length >= headerSize) {
    const packetType = socket.buffer.readUInt16BE(0); // 2바이트
    const versionLength = socket.buffer.readUInt8(PACKET_TYPE_SIZE);
    //최종 헤더 크기
    const totalHeaderLength = headerSize + versionLength;

    if (socket.buffer.length >= totalHeaderLength) {
      const versionOffset = PACKET_TYPE_SIZE + VERSION_LENGTH_SIZE;
      const version = socket.buffer.toString('utf-8', versionOffset, versionOffset + versionLength);

      const sequenceOffset = versionOffset + versionLength;
      const sequence = socket.buffer.readUInt32BE(sequenceOffset);

      const payloadLengthOffset = sequenceOffset + SEQUENCE_SIZE;
      const payloadLength = socket.buffer.readUInt32BE(payloadLengthOffset);

      // 패킷의 전체 길이 확인
      const packetLength = totalHeaderLength + payloadLength;

      // 실제 데이터
      const payload = socket.buffer.slice(totalHeaderLength, packetLength);
      socket.buffer = socket.buffer.slice(packetLength);

      console.log(`패킷 타입: ${getPacketTypeName(packetType)}`);
      // console.log(`버전 : ${version}`);
      // console.log(`시퀀스: ${sequence}`);
      // console.log(`패킷길이: ${packetLength}`);
      // console.log(`페이로드 : ${payload}`);
      try {
        // 모든 패킷을 GamePacket으로 처리 가능
        const decodedPacket = GamePacket.decode(payload);

        const handler = getProtoTypeNameByPacketType(packetType);
        if (handler) {
          await handler(socket, decodedPacket);
        }
      } catch (err) {
        console.error('패킷 처리 에러:', err);
      }
    } else {
      break;
    }
  }
};

export const getPacketTypeName = (packetType) => {
  return Object.keys(PACKET_TYPE).find((key) => PACKET_TYPE[key] === packetType) || 'Unknown packet type';
};
