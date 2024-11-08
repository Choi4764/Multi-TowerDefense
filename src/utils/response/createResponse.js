import { GamePacket } from "../../init/loadProtos.js";
import { createHeader } from "../createHeader.js";

const createResponse = (payload, packetType) => {
  const payloadBuffer = GamePacket.encode(GamePacket.create(payload)).finish();
  const header = createHeader(
    payloadBuffer.length,
    packetType,
    0, // user.sequence로 바꿔야 함
  );

  return Buffer.concat([header, payloadBuffer]);
};

export default createResponse
