import { Tower } from '../../classes/models/gameData.class.js';
import { initialState } from '../../classes/models/matchDummyData.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { createResponse } from '../../utils/response/createResponse.js';

export const towerPurchaseHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);
    const enemy = user.getEnemyUser();
    const gameSession = user.getGameSession();
    const towerIndex = gameSession.getTowerIndex();
    const gameData = user.getGameData();
    const { x, y } = payload.towerPurchaseRequest;

    gameData.addUserGold(-initialState.towerCost);
    gameData.addTower(new Tower(towerIndex, x, y));

    const userPayload = { towerPurchaseResponse: { towerId: towerIndex } };
    const enemyPayload = { addEnemyTowerNotification: { towerId: towerIndex, x, y } };

    user.socket.write(createResponse(userPayload, PACKET_TYPE.TOWER_PURCHASE_RESPONSE, user.getNextSequence()));
    enemy.socket.write(createResponse(enemyPayload, PACKET_TYPE.ADD_ENEMY_TOWER_NOTIFICATION, enemy.getNextSequence()));
  } catch (error) {
    console.error(error);
  }
};

export const towerAttackHandler = (socket, payload) => {
  try {
    const { towerId, monsterId } = payload.towerAttackRequest;
    const user = getUserBySocket(socket);
    const enemy = user.getEnemyUser();

    const enemyPayload = { enemyTowerAttackNotification: { towerId, monsterId } };

    enemy.socket.write(createResponse(enemyPayload, PACKET_TYPE.ENEMY_TOWER_ATTACK_NOTIFICATION, enemy.getNextSequence()));
  } catch (error) {
    console.error(error);
  }
};
