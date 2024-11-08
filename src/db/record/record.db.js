import pools from '../database.js';
import { SQL_QUERIES } from '../sql.queries.js';

// 게임 기록 생성 함수
export const createRecord = async (userId, opponentId, isWin, gameDate) => {
  const [result] = await pools.RECORD_DB.query(SQL_QUERIES.CREATE_RECORD, [
    userId,
    opponentId,
    isWin,
    gameDate,
  ]);
  return { id: result.insertId, userId, opponentId, isWin, gameDate };
};
