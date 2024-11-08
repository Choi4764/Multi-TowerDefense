import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createResponse from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { findUserById } from '../../db/user/user.db.js';
import { GlobalFailCode } from '../../init/loadProtos.js';
import { config } from '../../config/config.js';
import { addUser } from '../../sessions/user.session.js';

const sendErrorResponse = (socket, errorMessage) => {
  console.error(errorMessage);
  const errorResponse = createResponse(
    {
      loginResponse: {
        success: false,
        message: errorMessage,
        token: '',
        failCode: GlobalFailCode.AUTHENTICATION_FAILED,
      },
    },
    PACKET_TYPE.LOGIN_RESPONSE,
  );
  socket.write(errorResponse);
};

export const loginHandler = async (socket, payload) => {
  try {
    const { id, password } = payload.loginRequest;
    const user = await findUserById(id);

    if (!user) {
      const errorMessage = `${id} 유저가 존재하지 않습니다.`;
      sendErrorResponse(socket, errorMessage);
      return;
    }

    // 비밀번호 복호화
    if (!(await bcrypt.compare(password, user.password))) {
      const errorMessage = `${id}: 비밀번호가 틀렸습니다.`;
      sendErrorResponse(socket, errorMessage);
      return;
    }

    // NOTE: 세션에 유저를 추가하긴 하는데...
    // 유저 세션 말고 게임 매치 세션에 둬야하나?
    // WARN: env에 추가해서 env.js와 config.js를 통해 관리할 것
    
    const token = jwt.sign(user, config.auth.key, { expiresIn: '1h' });
    const bearerToken = `Bearer ${token}`;

    addUser(token, socket);

    const responsePayload = {
      loginResponse: {
        success: true,
        message: '로그인 성공',
        token: bearerToken,
        failCode: GlobalFailCode.NONE,
      },
    };

    const response = createResponse(responsePayload, PACKET_TYPE.LOGIN_RESPONSE);
    socket.write(response);
  } catch (err) {
    throw new Error(err);
  }
};