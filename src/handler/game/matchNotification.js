import { initialState, opponentData, playerData } from '../../classes/models/matchDummyData.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { addGameSession } from '../../sessions/game.session.js';
import { v4 as uuidv4 } from 'uuid';
import { GameData } from '../../classes/models/gameData.class.js';
import { createResponse } from '../../utils/response/createResponse.js';

export const matchNotification = (users) => {
  try {
    console.log(`매칭된 유저들: ${users.map((user) => user.name).join(', ')}`);

    const game = addGameSession(uuidv4());

    users.forEach((user, index) => {
      const isOpponent = index % 2 === 0;
      const payload = {
        matchStartNotification: {
          initialGameState: initialState,
          playerData: isOpponent ? playerData : opponentData,
          opponentData: isOpponent ? opponentData : playerData,
        },
      };

      user.socket.write(createResponse(payload, PACKET_TYPE.MATCH_START_NOTIFICATION, user.getNextSequence()));

      const gameData = new GameData(initialState.initialGold, initialState.baseHp, 1, 0);
      user.setGameSession(game, gameData);
      game.addUser(user);
    });

    game.startGameInterval();

    return;
  } catch (error) {
    console.error(error);
  }
};
