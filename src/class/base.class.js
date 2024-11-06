class Base {
    constructor(startHp) {
      this.baseHp = startHp;
    }
  
    // 게임 시작 시 베이스 체력 초기화
    initializeBase = (initHp) => {
      this.baseHp = initHp;
    };
  
    // 베이스 체력 설정
    setBaseHp = (changeHp) => {
      this.baseHp = changeHp;
    };
  
    // 베이스 체력 가져오기
    getBaseHp = () => {
      return this.baseHp;
    };
  }
  
  export default Base;