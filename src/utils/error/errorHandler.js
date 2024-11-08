import { getUserBySocket } from "../../sessions/user.session.js";
import createResponse from "../response/createResponse.js";


export const handleError = (socket, error) => {
  let responseCode;
  let message;

  const user = getUserBySocket(socket);

  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`에러 코드: ${user.id} : ${error.code}, 메시지: ${error.message}`);
  } else {
    responseCode = 10000; // 일반 에러 코드
    message = error.message;
    console.error(`일반 에러: ${user.id} : ${error.message}`);
  }
};
