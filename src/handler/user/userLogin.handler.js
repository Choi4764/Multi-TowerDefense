import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createResponse from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { findUserById } from '../../db/user/user.db.js';

const userLoginHandler = async (socket, payload) => {
  try {
    const { id, password } = payload.loginRequest;
    const user = await findUserById(id);

    if (!user) {
      console.error(`${id} 유저가 존재하지 않습니다.`);
      const errorResponse = createResponse(
        {
          loginResponse: {
            success: false,
            message: '유저가 존재하지 않습니다.',
            token: '',
            failCode: 3,
          },
        },
        PACKET_TYPE.LOGIN_RESPONSE,
      );
      socket.write(errorResponse);
      return;
    }

    // 비밀번호 복호화
    if (!await bcrypt.compare(password, user.password)) {
      console.error(`${socket}: 비밀번호가 틀렸습니다.`);
      const errorResponse = createResponse(
        {
          loginResponse: {
            success: false,
            message: '비밀번호가 틀렸습니다.',
            token: '',
            failCode: 3,
          },
        },
        PACKET_TYPE.LOGIN_RESPONSE,
      );
      socket.write(errorResponse);
      return;
    }

    // WARN: env에 추가해서 env.js와 config.js를 통해 관리할 것
    const TEMP_SECRET_KEY = 'temporary_secret_key';

    const token = jwt.sign(user, TEMP_SECRET_KEY, { expiresIn: '1h' });
    const bearerToken = `Bearer ${token}`;

    const responsePayload = {
      loginResponse: {
        success: true,
        message: '로그인 성공',
        token: bearerToken,
        failCode: 0,
      },
    };

    const response = createResponse(responsePayload, PACKET_TYPE.LOGIN_RESPONSE);
    socket.write(response);
  } catch (err) {
    throw new Error(err);
  }
};

export default userLoginHandler;
