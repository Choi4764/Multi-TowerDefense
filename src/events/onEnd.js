// import { getGameSession } from '../sessions/game.session.js';
import userManager from '../classes/managers/userManager.js';
import { removeGameSession } from '../sessions/game.session.js';
import { userSessions } from '../sessions/sessions.js';
import { getUserBySocket, removeUser } from '../sessions/user.session.js';

export const onEnd = (socket) => async () => {
  console.log('클라이언트 연결이 종료되었습니다.');

  try {
    const user = getUserBySocket(socket);

    if (userManager && user) {
      await userManager.removeFromQueue(user.id);

      const gameSession = user.getGameSession();

      if (gameSession) 
        {
        gameSession.stopGameInterval();
        await removeGameSession(gameSession.id);
      }

      user.setGameSession(null, null);
    }
    await removeUser(socket);

    console.log(`유저 삭제 ${userSessions}`);
  } catch (error) {
    console.error('onEnd 처리 중 오류 발생:', error);
  }
};
