import { getUserBySocket } from '../../sessions/user.session.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import userManager from '../../classes/managers/userManager.js';
import { handleError } from '../../utils/error/errorHandler.js';
import CustomError from '../../utils/error/customError.js';
import { removeGameSession } from '../../sessions/game.session.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { sendPacketByUser } from '../../utils/response/createResponse.js';

export const matchHandler = async (socket, payload) => {
  try {
    let user = getUserBySocket(socket);

    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found.');
    }

    userManager.addToMatchQueue(user);
  } catch (err) {
    handleError(socket, err);
  }
};

export const stateSyncNotification = async (user) => {
  try {
    const { userGold, baseHp, monsterLevel, score, towers, monsters } = user.getGameData();

    console.log(user.getGameData());

    const payload = {
      stateSyncNotification: { userGold, baseHp, monsterLevel, score, towers, monsters},
    };

    sendPacketByUser(user, payload, PACKET_TYPE.STATE_SYNC_NOTIFICATION);

  } catch (err) {
    console.error(err);
  }
};

export const gameEndHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);
    const gameSession = user.getGameSession();

    gameSession.stopGameInterval();

    if (gameSession) {
      await removeGameSession(user.gameSession.id);
      user.setGameSession(null, null);
    }
  } catch (err) {
    handleError(socket, err);
  }
};
