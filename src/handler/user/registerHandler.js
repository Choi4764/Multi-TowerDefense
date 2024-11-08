import Joi from 'joi';
import bcrypt from 'bcrypt';
import { createUser, findUserById } from '../../db/user/user.db.js';
import { sendPacketBySocket } from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { GlobalFailCode } from '../../init/loadProtos.js';

export const registerHandler = async (socket, payload) => {
  try {
    // payload 검증
    const schema = Joi.object({
      id: Joi.string().min(4).max(20).required(),
      password: Joi.string().min(8).max(20).required(),
      email: Joi.string().email().required(),
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

      sendPacketBySocket(socket, errorResponse, PACKET_TYPE.REGISTER_RESPONSE);
      return;
    }

    const { id, password, email } = payload.registerRequest;
    const user = await findUserById(id);
    if (user) {
      // 같은 id를 갖고 있는 사용자가 있다면
      console.error(errorMessage);
      const errorResponse = {
        registerResponse: {
          success: false,
          message: errorMessage,
          failCode: GlobalFailCode.AUTHENTICATION_FAILED,
        },
      };

      sendPacketBySocket(socket, errorResponse, PACKET_TYPE.REGISTER_RESPONSE);
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

    sendPacketBySocket(socket, responsePayload, PACKET_TYPE.REGISTER_RESPONSE);
  } catch (err) {
    throw new Error(err);
  }
};
