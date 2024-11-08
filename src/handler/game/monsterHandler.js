import { Monster } from '../../classes/models/gameData.class.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { createResponse } from '../../utils/response/createResponse.js';

export const spawnMonsterHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);
    const enemy = user.getEnemyUser();
    const monsterIndex = user.getGameSession().getMonsterIndex();
    const mNumber = Math.floor(Math.random() * 5) + 1;

    user.getGameData().addMonster(new Monster(monsterIndex, mNumber));

    const userPayload = { spawnMonsterResponse: { monsterId: monsterIndex, monsterNumber: mNumber } };
    const enemyPayload = { spawnEnemyMonsterNotification: { monsterId: monsterIndex, monsterNumber: mNumber } };

    user.socket.write(createResponse(userPayload, PACKET_TYPE.SPAWN_MONSTER_RESPONSE, user.getNextSequence()));
    enemy?.socket.write(createResponse(enemyPayload, PACKET_TYPE.SPAWN_ENEMY_MONSTER_NOTIFICATION, enemy.getNextSequence()));
  } catch (error) {
    console.error(error);
  }
};

export const monsterAttackBaseHandler = async (socket, payload) => {
  try {
    const { damage } = payload.monsterAttackBaseRequest;

    const user = getUserBySocket(socket);
    const enemy = user.getEnemyUser();
    const baseHp = user.getGameData().getDamageBaseHp(damage);

    const userPayload = { updateBaseHpNotification: { isOpponent: false, baseHp } };
    const enemyPayload = { updateBaseHpNotification: { isOpponent: true, baseHp } };

    user.socket.write(createResponse(userPayload, PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION, user.getNextSequence()));
    enemy?.socket.write(createResponse(enemyPayload, PACKET_TYPE.UPDATE_BASE_HP_NOTIFICATION, enemy.getNextSequence()));

    if (baseHp <= 0) {
      const userResultPayload  = { gameOverNotification: { isWin: false } };
      const enemyResultPayload  = { gameOverNotification: { isWin: true } };
      
      user.socket.write(createResponse(userResultPayload, PACKET_TYPE.GAME_OVER_NOTIFICATION, user.getNextSequence()));
      enemy?.socket.write(createResponse(enemyResultPayload, PACKET_TYPE.GAME_OVER_NOTIFICATION, enemy.getNextSequence()));
    }
  } catch (error) {
    console.error(error);
  }
};

export const enemyDeathNotificationHandler = async (socket, payload) => {
  const { monsterId } = payload.monsterDeathNotification;

  const user = getUserBySocket(socket);
  const enemy = user.getEnemyUser();
  const gameData = user.getGameData();

  gameData.addUserGold(10);
  gameData.addScore(10);
  gameData.removeMonster(monsterId);

  const enemyPayload = { enemyMonsterDeathNotification: { monsterId } };
  enemy?.socket.write(createResponse(enemyPayload, PACKET_TYPE.ENEMY_MONSTER_DEATH_NOTIFICATION, enemy.getNextSequence()));
};
