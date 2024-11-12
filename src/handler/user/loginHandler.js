import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { findUserById } from '../../db/user/user.db.js';
import { GlobalFailCode } from '../../init/loadProtos.js';
import { config } from '../../config/config.js';
import { addUser } from '../../sessions/user.session.js';

export const loginHandler = async (socket, payload) => {
  try {
    const { id, password } = payload.loginRequest;
    const user = await findUserById(id);

    if (!user) {
      const errorMessage = `${id} 유저가 존재하지 않습니다.`;
      console.error(errorMessage);
      const errorResponse = {
        loginResponse: {
          success: false,
          message: errorMessage,
          token: '',
          failCode: GlobalFailCode.AUTHENTICATION_FAILED,
        },
      };

      socket.write(
        createResponse(
          errorResponse,
          PACKET_TYPE.LOGIN_RESPONSE,
          0,
        ),
      );
      return;
    }

    // 비밀번호 복호화
    if (!(await bcrypt.compare(password, user.password))) {
      const errorMessage = `${id}: 비밀번호가 틀렸습니다.`;
      console.error(errorMessage);
      const errorResponse = {
        loginResponse: {
          success: false,
          message: errorMessage,
          token: '',
          failCode: GlobalFailCode.AUTHENTICATION_FAILED,
        },
      };

      socket.write(
        createResponse(
          errorResponse,
          PACKET_TYPE.LOGIN_RESPONSE,
          0,
        ),
      );
      return;
    }

    const token = jwt.sign(user, config.auth.key, { expiresIn: '1h' });
    const bearerToken = `Bearer ${token}`;
    const newUser = addUser(token, socket);

    const responsePayload = {
      loginResponse: {
        success: true,
        message: `로그인 성공_${id}`,
        token: bearerToken,
        failCode: GlobalFailCode.NONE,
      },
    };

      socket.write(
      createResponse(
        responsePayload,
        PACKET_TYPE.LOGIN_RESPONSE,
        0,
      ),
    );
  } catch (err) {
    throw new Error(err);
  }
};
