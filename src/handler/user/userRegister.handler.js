import { createUser, findUserById } from '../../db/user/user.db.js';
import createResponse from '../../utils/response/createResponse.js';
import { PACKET_TYPE } from '../../constants/header.js';

// TODO: email 검증, id 길이 검증, password 암호화
const userRegisterHandler = async (socket, payload) => {
  try {
    const { id, password, email } = payload;
    const user = await findUserById(id);
    if (user) {
      console.log(user);
      // 같은 id를 갖고 있는 사용자가 있다면
      const errorResponse = createResponse({
        registerResponse: {
          success: false,
          message: 'register fail',
          failCode: 3,
        },
      });
      socket.write(errorResponse);
      return;
    }

    await createUser(id, password, email);
    console.log('createUser 성공');

    // NOTE: 아래 Response 생성하는 것도 파일 나눠줘야 함.
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
