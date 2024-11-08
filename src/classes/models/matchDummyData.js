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
  monsterPath: [
    // 몬스터 이동 경로
    { x: 0, y: 250 },
    { x: 50, y: 250 },
    { x: 110, y: 250 },
    { x: 170, y: 250 },
    { x: 230, y: 250 },
    { x: 290, y: 250 },
    { x: 350, y: 250 },
    { x: 410, y: 250 },
    { x: 470, y: 250 },
    { x: 530, y: 250 },
    { x: 590, y: 250 },
    { x: 650, y: 250 },
    { x: 710, y: 250 },
    { x: 770, y: 250 },
    { x: 830, y: 250 },
    { x: 890, y: 250 },
    { x: 950, y: 250 },
    { x: 1010, y: 250 },
    { x: 1070, y: 250 },
    { x: 1130, y: 250 },
    { x: 1190, y: 250 },
  ],
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
  monsterPath: [
    // 몬스터 이동 경로
    { x: 0, y: 250 },
    { x: 50, y: 250 },
    { x: 110, y: 250 },
    { x: 170, y: 250 },
    { x: 230, y: 250 },
    { x: 290, y: 250 },
    { x: 350, y: 250 },
    { x: 410, y: 250 },
    { x: 470, y: 250 },
    { x: 530, y: 250 },
    { x: 590, y: 250 },
    { x: 650, y: 250 },
    { x: 710, y: 250 },
    { x: 770, y: 250 },
    { x: 830, y: 250 },
    { x: 890, y: 250 },
    { x: 950, y: 250 },
    { x: 1010, y: 250 },
    { x: 1070, y: 250 },
    { x: 1130, y: 250 },
    { x: 1190, y: 250 },
  ],
  basePosition: { x: 1370, y: 250 }, // 기지 위치
};

// const responsePayload = {
//     matchStartNotification: {
//       success: true,
//       // user 클래스로 관리해줘야 하는 것 같음
//       playerData: {
//         gold: 1000,
//         base: {
//           hp: 100,
//           maxHp: 200,
//         },
//         highScore: 0,
//         towers: [
//           { id: 1, x: 900, y: 400 },
//           { id: 1, x: 1000, y: 400 },
//           { id: 1, x: 1100, y: 400 },
//         ],
//         monsters: [
//           { monsterId: 1, monsterNumber: 3, level: 1 },
//           { monsterId: 2, monsterNumber: 3, level: 1 },
//         ],
//         monsterLevel: 1,
//         score: 0,
//         monsterPath: [
//           // NOTE: pivot 설정하고 엔드 포인트까지 루프
//           { x: 0, y: 250 },
//           { x: 50, y: 250 },
//           { x: 110, y: 250 },
//           { x: 170, y: 250 },
//           { x: 230, y: 250 },
//           { x: 290, y: 250 },
//           { x: 350, y: 250 },
//           { x: 410, y: 250 },
//           { x: 470, y: 250 },
//           { x: 530, y: 250 },
//           { x: 590, y: 250 },
//           { x: 650, y: 250 },
//           { x: 710, y: 250 },
//           { x: 770, y: 250 },
//           { x: 830, y: 250 },
//           { x: 890, y: 250 },
//           { x: 950, y: 250 },
//           { x: 1010, y: 250 },
//           { x: 1070, y: 250 },
//           { x: 1130, y: 250 },
//           { x: 1190, y: 250 },
//         ],
//         basePosition: { x: 1370, y: 250 },
//       },
//       opponentData: {
//         gold: 1000,
//         base: {
//           hp: 100,
//           maxHp: 200,
//         },
//         highScore: 0,
//         towers: [
//           { id: 1, x: 900, y: 400 },
//           { id: 1, x: 1000, y: 350 },
//           { id: 1, x: 1100, y: 400 },
//         ],
//         monsters: [
//           { monsterId: 1, monsterNumber: 3, level: 1 },
//           { monsterId: 1, monsterNumber: 3, level: 1 },
//         ],
//         monsterLevel: 1,
//         score: 0,
//         monsterPath: [
//           { x: 0, y: 250 },
//           { x: 50, y: 250 },
//           { x: 110, y: 250 },
//           { x: 170, y: 250 },
//           { x: 230, y: 250 },
//           { x: 290, y: 250 },
//           { x: 350, y: 250 },
//           { x: 410, y: 250 },
//           { x: 470, y: 250 },
//           { x: 530, y: 250 },
//           { x: 590, y: 250 },
//           { x: 650, y: 250 },
//           { x: 710, y: 250 },
//           { x: 770, y: 250 },
//           { x: 830, y: 250 },
//           { x: 890, y: 250 },
//           { x: 950, y: 250 },
//           { x: 1010, y: 250 },
//           { x: 1070, y: 250 },
//           { x: 1130, y: 250 },
//           { x: 1190, y: 250 },
//         ],
//         basePosition: { x: 1370, y: 250 },
//       },
//     },
//   };
