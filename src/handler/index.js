import { loginHandler } from './user/loginHandler.js';
import { registerHandler } from './user/registerHandler.js';
import { gameEndHandler, matchHandler } from './game/gameStateHandler.js';
import { towerAttackHandler, towerPurchaseHandler } from './game/towerHandler.js';
import {
  enemyDeathNotificationHandler,
  monsterAttackBaseHandler,
  spawnMonsterHandler,
} from './game/monsterHandler.js';
import { PACKET_TYPE } from '../constants/header.js';

const handlers = {
  // 회원가입 및 로그인
  [PACKET_TYPE.REGISTER_REQUEST]: { handler: registerHandler },
  [PACKET_TYPE.LOGIN_REQUEST]: { handler: loginHandler },

  // 매칭
  [PACKET_TYPE.MATCH_REQUEST]: { handler: matchHandler },

  // 타워 구입 및 배치
  [PACKET_TYPE.TOWER_PURCHASE_REQUEST]: { handler: towerPurchaseHandler },

  // 몬스터 생성
  [PACKET_TYPE.SPAWN_MONSTER_REQUEST]: { handler: spawnMonsterHandler },

  // 전투 액션
  [PACKET_TYPE.TOWER_ATTACK_REQUEST]: { handler: towerAttackHandler },

  [PACKET_TYPE.MONSTER_ATTACK_BASE_REQUEST]: { handler: monsterAttackBaseHandler },

  [PACKET_TYPE.MONSTER_DEATH_NOTIFICATION]: { handler: enemyDeathNotificationHandler },
  // // 게임 종료
  [PACKET_TYPE.GAME_END_REQUEST]: { handler: gameEndHandler },
};

export const getProtoTypeNameByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }
  return handlers[packetType].handler;
};
