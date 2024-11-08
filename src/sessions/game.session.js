import Game from "../classes/models/game.class.js";
import { gameSessions } from "./sessions.js";

export const addGameSession = (gameId) => {
  const game = new Game(gameId);
  gameSessions.push(game);
  console.log(`게임 세션 추가 ${gameSessions}`);
  return game;
};

export const removeGameSession = (gameId) => {
  const index = gameSessions.findIndex((game) => game.id === gameId);

  if(index !== -1){
    gameSessions.splice(index, 1);
  }

  console.log(`게임 세션 삭제 ${gameSessions}`);
};