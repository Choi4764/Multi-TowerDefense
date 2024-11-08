import { initialState, opponentData, playerData } from '../../classes/models/matchDummyData.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { addGameSession } from '../../sessions/game.session.js';
import { v4 as uuidv4 } from 'uuid';
import createResponse from '../../utils/response/createResponse.js';
import { GameData } from '../../classes/models/gameData.class.js';

export const matchNotification = (users) => {
  try {
    console.log(`매칭된 유저들: ${users.map((user) => user.name).join(', ')}`);

    const game = addGameSession(uuidv4());

    users.forEach((user, index) => {
      // 매칭 시작 알림 생성
      const isOpponent = index % 2 === 0;  

      const payload = {
        matchStartNotification: {
          initialGameState: initialState,
          playerData: isOpponent ? playerData : opponentData,
          opponentData: isOpponent ? opponentData : playerData
        }
      };
  
      sendPacket(user, payload,  PACKET_TYPE.MATCH_START_NOTIFICATION);

      // 게임 데이터 생성 및 세션 설정
      const gameData = new GameData(initialState.initialGold, initialState.baseHp, 1, 0);
      user.setGameSession(game, gameData);

      // 유저를 게임 세션에 추가
      game.addUser(user);
    });

    game.startGameInterval();

    return;
  } catch (error) {
    console.error(error);
  }
};
