import Joi from 'joi';
import bcrypt from 'bcrypt';
import { createUser, findUserById } from '../../db/user/user.db.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { GlobalFailCode } from '../../init/loadProtos.js';

export const registerHandler = async (socket, payload) => {
  try {
    // payload 검증
    const schema = Joi.object({
      id: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(8).max(20).required(),
      email: Joi.string().email().required(),
      verifyPassword: Joi.string().required(),
    });

    const validation = schema.validate(payload.registerRequest);
    const validationError = validation.error;
    if (validationError) {
      // 검증 실패
      const errorMessage = `검증 실패: ${validationError}`;
      console.error(errorMessage);
      const errorResponse = {
        registerResponse: {
          success: false,
          message: errorMessage,
          failCode: GlobalFailCode.AUTHENTICATION_FAILED,
        },
      };

      socket.write(createResponse(errorResponse, PACKET_TYPE.REGISTER_RESPONSE, 0));
      return;
    }

    const { id, password, email, verifyPassword } = payload.registerRequest;

    if (password !== verifyPassword) {
      const errorMessage = '비밀번호 확인이 필요합니다.';
      console.error(errorMessage);
      const errorResponse = {
        registerResponse: {
          success: false,
          message: errorMessage,
          failCode: GlobalFailCode.AUTHENTICATION_FAILED,
        },
      };
      socket.write(createResponse(errorResponse, PACKET_TYPE.REGISTER_RESPONSE, 0));
    }

    const user = await findUserById(id);
    if (user) {
      // 같은 id를 갖고 있는 사용자가 있다면
      const errorMessage = console.error('중복 오류');
      const errorResponse = {
        registerResponse: {
          success: false,
          message: errorMessage,
          failCode: GlobalFailCode.AUTHENTICATION_FAILED,
        },
      };

      socket.write(createResponse(errorResponse, PACKET_TYPE.REGISTER_RESPONSE, 0));
      return;
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(email, id, hashedPassword);
    console.log('유저 생성됨.');

    const responsePayload = {
      registerResponse: {
        success: true,
        message: 'register success',
        failCode: GlobalFailCode.NONE,
      },
    };

    socket.write(createResponse(responsePayload, PACKET_TYPE.REGISTER_RESPONSE, 0));
  } catch (err) {
    console.error(err);
  }
};
