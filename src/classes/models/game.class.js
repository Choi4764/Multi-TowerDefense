import { stateSyncNotification } from "../../handler/game/gameStateHandler.js";

class Game {

  constructor(id) {
    this.id = id;
    this.users = [];
    this.monsterIndex = 0;
    this.towerIndex = 7;    
  }

  addUser(user) {
    this.users.push(user);
  }

  getEnemyUser(userId) {
    return this.users.find((user) => user.id !== userId);
  }

  removeUser(userId) {
    const index = this.users.findIndex((user) => user.id === userId);
    this.users.splice(index, 1);
  }

  getMonsterIndex(){
    console.log(`몬스터 생성 ${this.monsterIndex}`);
    return this.monsterIndex++;
  }

  getTowerIndex(){
    console.log(`타워 생성 ${this.towerIndex}`);
    return this.towerIndex++;
  }

  startGameInterval() {
    this.gameInterval = setInterval(async () => {
      for (const user of this.users) {
        await stateSyncNotification(user);
      }
    }, 5000);
  }

  stopGameInterval() {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
  }
}

export default Game;
