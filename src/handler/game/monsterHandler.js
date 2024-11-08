import { Monster } from '../../classes/models/gameData.class.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import createResponse from '../../utils/response/createResponse.js';

export const spawnMonsterHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);

    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found');
    }

    const monsterIndex = gameSession.getMonsterIndex();
    const mNumber = Math.floor(Math.random() * 5) + 1;

    const userPayload = {
      spawnMonsterResponse: {
        monsterId: monsterIndex,
        monsterNumber: mNumber,
      },
    };

    sendPacket(user, userPayload, PACKET_TYPE.SPAWN_MONSTER_RESPONSE);

    const gameData = user.getGameData();
    gameData.addMonster(new Monster(monsterIndex, mNumber));

    const opponentUser = user.getOpponentUser();

    if (!opponentUser) {
      return;
    }

    const opponentPayload = {
      spawnMonsterResponse: {
        monsterId: monsterIndex,
        monsterNumber: mNumber,
      },
    };

    sendPacket(opponentUser, opponentPayload, PACKET_TYPE.SPAWN_ENEMY_MONSTER_NOTIFICATION);
  } catch (error) {
    console.error(error);
  }
};

export const monsterAttackBaseHandler = async (socket, payload) => {
  try {
    const { damage } = payload.monsterAttackBaseRequest;

    const user = getUserBySocket(socket);
    let baseHp = user.getGameData().getDamageBaseHp(damage);

    const userPayload = {
      updateBaseHpNotification: {
        isOpponent: false,
        baseHp,
      },
    };

    sendPacket(user, userPayload, PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION);

    const opponentUser = user.getOpponentUser();

    if (!opponentUser) {
      return;
    }

    const opponentPayload = {
      updateBaseHpNotification: {
        isOpponent: true,
        baseHp,
      },
    };

    sendPacket(opponentUser, opponentPayload, PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION);

    if (baseHp <= 0) {
      console.log('게임 패배 및 승리 이벤트 !');

      const userResultPayload = {
        gameOverNotification: {
          isWin: false,
        },
      };
  
      sendPacket(user, userResultPayload, PACKET_TYPE.GAME_OVER_NOTIFICATION);

      const opponentResultPayload = {
        gameOverNotification: {
          isWin: true,
        },
      };
  
      sendPacket(opponentUser, opponentResultPayload, PACKET_TYPE.GAME_OVER_NOTIFICATION);
    }
  } catch (error) {
    console.error(error);
  }
};

export const enemyDeathNotificationHandler = async (socket, payload) => {
  const { monsterId } = payload.monsterDeathNotification;

  const user = getUserBySocket(socket);
  const game = user.getGameSession();
  const opponentUser = game.getOpponentUser(user.id);

  const gameData = user.getGameData();
  gameData.addUserGold(10);
  gameData.addScore(10);
  gameData.removeMonster(monsterId);

  const opponentPayload =  {
    enemyMonsterDeathNotification: {
      monsterId,
    },
  };

  sendPacket(opponentUser, opponentPayload, PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION);
};
