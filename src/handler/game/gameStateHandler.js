import { getUserBySocket } from '../../sessions/user.session.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import userManager from '../../classes/managers/userManager.js';
import { handleError } from '../../utils/error/errorHandler.js';
import CustomError from '../../utils/error/customError.js';
import { removeGameSession } from '../../sessions/game.session.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createResponse.js';

export const matchHandler = async (socket, payload) => {
  try {
    let user = getUserBySocket(socket);
    userManager.addToMatchQueue(user);
  } catch (err) {
    handleError(socket, err);
  }
};

export const stateSyncNotification = async (user) => {
  try {
    user.getRandomMonsterLevelUp();    
    const { userGold, baseHp, monsterLevel, score, towers, monsters } = user.getGameData();
    const payload = { stateSyncNotification: { userGold, baseHp, monsterLevel, score, towers, monsters } };

    user.socket.write(createResponse(payload, PACKET_TYPE.STATE_SYNC_NOTIFICATION, user.getNextSequence()));
  } catch (err) {
    console.error(err);
  }
};

export const gameEndHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);
    const gameSession = user.getGameSession();

    if (gameSession) {
      gameSession.stopGameInterval();
      await removeGameSession(user.gameSession.id);
      user.setGameSession(null, null);
    }
  } catch (err) {
    handleError(socket, err);
  }
};
