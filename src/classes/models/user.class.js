import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";

class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.gameSession = null;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();

    this.gameData = null;
  }
  
  toString() {
    return `User { id: ${this.id} }`;
  }

  setGameSession(gameSession, gameData)
  {
    this.gameSession = gameSession;
    this.gameData = gameData;
  }

  getGameSession(){
    return this.gameSession;
  }

  getEnemyUser()
  {
    if (!this.gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임이 존재하지 않습니다');
    }
    return this.gameSession.getEnemyUser(this.id);
  }

  addTower(tower) {
  this.towers.push(tower);
  }


  getNextSequence() {
    return ++this.sequence;
  }

  getGameData(){
    return this.gameData;
  }
}

export default User;
