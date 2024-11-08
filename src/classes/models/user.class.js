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
