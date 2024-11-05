import { createUser, findUserById } from '../../db/user/user.db.js';
import createHeader from '../../utils/createHeader.js';
import { GamePacket } from '../../init/loadProto.js';
import { PACKET_TYPE } from '../../constants/header.js';

// TODO: DB 작업해주고, Response 생성해주고 해당 Response 반환
// payload로 id, password, email 들어옴
const userRegisterHandler = async (socket, payload) => {
  console.log(payload);
  console.log(socket);
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

    const response = createResponse(responsePayload);
    socket.write(response);
  } catch (err) {
    throw new Error(err);
  }
};

const createResponse = (responsePayload) => {
  console.log(responsePayload);
  const payloadBuffer = GamePacket.encode(GamePacket.create(responsePayload)).finish();
  console.log(payloadBuffer);
  const header = createHeader(
    payloadBuffer.length,
    PACKET_TYPE.REGISTER_RESPONSE,
    0, // user.sequence로 바꿔야 함
  );

  console.log('response 생성 성공');
  return Buffer.concat([header, payloadBuffer]);
};

export default userRegisterHandler;
