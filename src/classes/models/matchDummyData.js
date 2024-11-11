import generatePath from '../../utils/generateMonsterPath.js';

// 게임의 초기 상태 예제
export const initialState = {
  baseHp: 100, // 초기 기지 HP
  towerCost: 50, // 타워 비용
  initialGold: 200, // 초기 골드
  monsterSpawnInterval: 5000, // 몬스터 생성 간격 (밀리초)
};

// 플레이어 데이터 예제
export const playerData = {
  gold: 150, // 현재 골드
  baseHp: 100, // 기지의 현재 HP
  maxHp: 100, // 기지의 최대 HP
  highScore: 0, // 플레이어의 최고 점수
  towers: [
    // 플레이어의 타워 목록
    { towerId: 1, x: 900, y: 400 },
    { towerId: 2, x: 1000, y: 400 },
    { towerId: 3, x: 1100, y: 400 },
  ],
  monsters: [
    // 플레이어의 몬스터 목록
  ],
  monsterLevel: 1, // 몬스터의 현재 레벨
  score: 0, // 플레이어의 현재 점수
  monsterPath: generatePath(22, 0, 250, 1370, 80),
  basePosition: { x: 1370, y: 250 }, // 기지 위치
};

// 상대방 데이터 예제 (playerData와 유사한 구조)
export const opponentData = {
  gold: 150, // 현재 골드
  baseHp: 100, // 기지의 현재 HP
  maxHp: 100, // 기지의 최대 HP
  highScore: 0, // 플레이어의 최고 점수
  towers: [
    // 플레이어의 타워 목록
    { towerId: 4, x: 900, y: 400 },
    { towerId: 5, x: 1000, y: 400 },
    { towerId: 6, x: 1100, y: 400 },
  ],
  monsters: [
    // 플레이어의 몬스터 목록
  ],
  monsterLevel: 1, // 몬스터의 현재 레벨
  score: 0, // 플레이어의 현재 점수
  monsterPath: generatePath(22, 0, 250, 1370, 80),
  basePosition: { x: 1370, y: 250 }, // 기지 위치
};
