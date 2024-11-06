import Joi from 'joi';
import bcrypt from 'bcrypt';
import { createUser, findUserById } from '../../db/user/user.db.js';
import createResponse from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

const createErrorResponse = (msg) => {
  const errorResponse = createResponse(
    {
      registerResponse: {
        success: false,
        message: msg,
        failCode: 3,
      },
    },
    PACKET_TYPE.REGISTER_RESPONSE,
  );

  return errorResponse;
};

const userRegisterHandler = async (socket, payload) => {
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
      const msg = `검증 실패: ${validationError}`;
      console.error(msg);
      const errorResponse = createErrorResponse(msg);
      socket.write(errorResponse);
      return;
    }

    const { id, password, email } = payload.registerRequest;
    const user = await findUserById(id);
    if (user) {
      console.log(user);
      // 같은 id를 갖고 있는 사용자가 있다면
      const errorResponse = createErrorResponse('사용할 수 없는 아이디입니다.');
      socket.write(errorResponse);
      return;
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser(id, hashedPassword, email);
    console.log('유저 생성됨.');

    const responsePayload = {
      registerResponse: {
        success: true,
        message: 'register success',
        failCode: 0, // failCode도 상수로 쓰지 말고 Constants에 작성하기
      },
    };

    const response = createResponse(responsePayload, PACKET_TYPE.REGISTER_RESPONSE);
    socket.write(response);
  } catch (err) {
    throw new Error(err);
  }
};

export default userRegisterHandler;
