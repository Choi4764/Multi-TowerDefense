import { Tower } from '../../classes/models/gameData.class.js';
import { initialState } from '../../classes/models/matchDummyData.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { sendPacketByUser } from '../../utils/response/createResponse.js';

export const towerPurchaseHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);

    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found');
    }

    const gameSession = user.getGameSession();
    const towerIndex = gameSession.getTowerIndex();
    const { x, y } = payload.towerPurchaseRequest;

    const userPayload = {
      towerPurchaseResponse: {
        towerId: towerIndex,
      },
    };

    sendPacketByUser(user, userPayload, PACKET_TYPE.TOWER_PURCHASE_RESPONSE);

    const gameData = user.getGameData();
    gameData.addUserGold(initialState.towerCost);
    gameData.addTower(new Tower(towerIndex, x, y));

    const opponentUser = user.getOpponentUser();

    if (!opponentUser) {
       return;
    }

    const opponentPayload = {
      towerPurchaseResponse: {
        towerId: towerIndex,
      },
    };

    sendPacketByUser(opponentUser, opponentPayload, PACKET_TYPE.ADD_ENEMY_TOWER_NOTIFICATION);
  } catch (error) {
    console.error(error);
  }
};

export const towerAttackHandler = (socket, payload) => {
  try {
    const { towerId, monsterId } = payload.towerAttackRequest;
    const user = getUserBySocket(socket);

    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found');
    }

    const opponentUser = user.getOpponentUser();
    if (!opponentUser) {
      return;
    }

    const opponentPayload = {
      enemyTowerAttackNotification: {
        towerId,
        monsterId,
      },
    };

    sendPacketByUser(opponentUser, opponentPayload, PACKET_TYPE.ENEMY_TOWER_ATTACK_NOTIFICATION);
  } catch (error) {
    console.error(error);
  }
};
