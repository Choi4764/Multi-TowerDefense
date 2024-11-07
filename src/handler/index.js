import { PACKET_TYPE } from '../constants/header.js';
import userLoginHandler from './user/userLogin.handler.js';
import userRegisterHandler from './user/userRegister.handler.js';

const handlers = {
  [PACKET_TYPE.REGISTER_REQUEST]: {
    handler: userRegisterHandler,
  },
  [PACKET_TYPE.LOGIN_REQUEST]: {
    handler: userLoginHandler,
  },
  [PACKET_TYPE.MATCH_REQUEST]: {
    // 임시로 넣은 핸들러
    handler: (socket, payload) => {
      console.log('매치요청');
    },
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    throw new Error();
  }

  return handlers[packetType].handler;
};
