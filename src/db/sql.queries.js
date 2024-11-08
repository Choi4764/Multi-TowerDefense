export const SQL_QUERIES = {
  //user
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE userId = ?',
  CREATE_USER: 'INSERT INTO user (userId, password, email) VALUES (?, ?, ?)',
  UPDATE_USER_LOGIN_TIMESTAMP: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE userId = ?',

  //record
  CREATE_RECORD: `INSERT INTO record (userId , opponentId , isWin)
  VALUES (?,?,?)`,
};
