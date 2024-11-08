class GameData {
  constructor(userGold, baseHp, monsterLevel, score) {
    this.userGold = userGold;
    this.baseHp = baseHp;
    this.monsterLevel = monsterLevel;
    this.score = score;

    this.towers = [];
    this.monsters = [];
  }

  addUserGold(userGold) {
    this.userGold += userGold;
  }

  addMonsterLevel(monsterLevel) {
    this.monsterLevel += monsterLevel;
  }

  addScore(score) {
    this.score += score;
  }

  getDamageBaseHp(damage) {
    this.baseHp -= damage;
    return this.baseHp;
  }

  addTower(tower){
    this.towers.push(tower);
  }

  addMonster(monster){
    this.monsters.push(monster);
  }

  removeMonster(monsterId){
    const index = this.monsters.findIndex((monster) => monster.id === monsterId)

    if(index !== -1){
      return this.monsters.splice(index, 1);
    }
  }
}

class Tower {
  constructor(id,  x, y)
  {
      this.id = id;
      this.x = x;
      this.y = y;
  }
}

class Monster {
  constructor(id, monsterNum){
    this.id = id;
    this.monsterNum = monsterNum;
  }
}

export { GameData, Tower, Monster }
