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

    const gameSession = user.getGameSession();
    const monsterIndex = gameSession.getMonsterIndex();
    const mNumber = Math.floor(Math.random() * 5) + 1;

    const monsterSpawn = createResponse(
      {
        spawnMonsterResponse: {
          monsterId: monsterIndex,
          monsterNumber: mNumber,
        },
      },
      PACKET_TYPE.SPAWN_MONSTER_RESPONSE,
    );

    socket.write(monsterSpawn);

    const gameData = user.getGameData();
    gameData.addMonster(new Monster(monsterIndex, mNumber));

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임이 존재하지 않습니다');
    }

    const opponentUser = gameSession.getOpponentUser(user.id);

    if (!opponentUser) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저가 존재하지 않습니다');
    }

    const spawnNotification = createResponse(
      {
        spawnEnemyMonsterNotification: {
          monsterId: monsterIndex,
          monsterNumber: mNumber,
        },
      },
      PACKET_TYPE.SPAWN_ENEMY_MONSTER_NOTIFICATION,
    );

    opponentUser.socket.write(spawnNotification);
  } catch (error) {
    console.error(error);
  }
};

export const monsterAttackBaseHandler = async (socket, payload) => {
  try {
    const { damage } = payload.monsterAttackBaseRequest;

    // console.log(`몬스터 데미지 : ${damage}`);
    
    const user = getUserBySocket(socket);
    let baseHp = user.getGameData().getDamageBaseHp(damage);

    const baseHpResponse = createResponse(
      {
        updateBaseHpNotification: {
          isOpponent: false,
          baseHp,
        },
      },
      PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    );

    socket.write(baseHpResponse);

    const game = user.getGameSession();
    const opponentUser = game.getOpponentUser(user.id);

    const enemyBaseHpResponse = createResponse(
      {
        updateBaseHpNotification: {
          isOpponent: true,
          baseHp,
        },
      },
      PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION,
    );

    opponentUser.socket.write(enemyBaseHpResponse);

    if (baseHp <= 0) {

      console.log("게임 패배 및 승리 이벤트 !");
      
      const gameOverNotfication = createResponse(
        {
          gameOverNotification: {
            isWin: false,
          },
        },
        PACKET_TYPE.GAME_OVER_NOTIFICATION,
      );
      
      socket.write(gameOverNotfication);

      const enemyGameOverNotfication = createResponse(
        {
          gameOverNotification: {
            isWin: true,
          },
        },
        PACKET_TYPE.GAME_OVER_NOTIFICATION,
      );

      opponentUser.socket.write(enemyGameOverNotfication);
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

  // console.log(`몬스터 사망 : ${monsterId}`);

  const gameData = user.getGameData();
  gameData.addUserGold(10);
  gameData.addScore(10);
  gameData.removeMonster(monsterId);

  const deathNotification = createResponse(
    {
      enemyMonsterDeathNotification: {
        monsterId,
      },
    },
    PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION,
  );

  opponentUser.socket.write(deathNotification);
};
