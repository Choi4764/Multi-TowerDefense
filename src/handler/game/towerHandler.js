import { Tower } from '../../classes/models/gameData.class.js';
import { initialState } from '../../classes/models/matchDummyData.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import CustomError from '../../utils/error/customError.js';
import createResponse from '../../utils/response/createResponse.js';
import { stateSyncNotification } from './gameStateHandler.js';

export const towerPurchaseHandler = async (socket, payload) => {
  try {
    const user = getUserBySocket(socket);

    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found');
    }

    const gameSession = user.getGameSession();
    const towerIndex = gameSession.getTowerIndex();
    const { x, y } = payload.towerPurchaseRequest;

    const purchaseResponse = createResponse(
      {
        towerPurchaseResponse: {
          towerId: towerIndex,
        },
      },
      PACKET_TYPE.TOWER_PURCHASE_RESPONSE,
    );

    socket.write(purchaseResponse);

    const gameData = user.getGameData();
    gameData.addUserGold(initialState.towerCost);
    gameData.addTower(new Tower(towerIndex, x, y));

    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임이 존재하지 않습니다');
    }

    const opponentUser = gameSession.getOpponentUser(user.id);

    if (!opponentUser) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저가 존재하지 않습니다');
    }

    const enemyTowerNotification = createResponse(
      {
        addEnemyTowerNotification: {
          towerId: towerIndex,
          x,
          y
        },
      },
      PACKET_TYPE.ADD_ENEMY_TOWER_NOTIFICATION,
    );

    opponentUser.socket.write(enemyTowerNotification);

  } catch (error) {
    console.error(error);
  }
};

export const towerAttackHandler = (socket, payload) => {
  try {

    const { towerId, monsterId } = payload.towerAttackRequest;
    const user = getUserBySocket(socket);

    if(!user){
        throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'User not found');        
    }

    const game = user.getGameSession();
    if(!game){
        throw new CustomError(ErrorCodes.GAME_NOT_FOUND, 'Game not found');
    }

    const opponentUser = game.getOpponentUser(user.id);
    if(!opponentUser){
        throw new CustomError(ErrorCodes.USER_NOT_FOUND, 'opponentUser not found');
    }  

    const attackNotification = createResponse({
        enemyTowerAttackNotification:{
            towerId,
            monsterId
        }
    }, PACKET_TYPE.ENEMY_TOWER_ATTACK_NOTIFICATION)

    opponentUser.socket.write(attackNotification);
    
  } catch (error) {
    console.error(error);
  }
};
