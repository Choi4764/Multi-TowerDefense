export const SQL_QUERIES = {
  //user
  FIND_USER_BY_ID: 'SELECT * FROM User WHERE userId = ?',
  CREATE_USER: 'INSERT INTO User (email, userId, password) VALUES (?, ?, ?)',
  UPDATE_USER_LOGIN_TIMESTAMP: 'UPDATE User SET last_login = CURRENT_TIMESTAMP WHERE userId = ?',

  //record
  CREATE_RECORD: `INSERT INTO Record (userId , opponentId , isWin, gameDate  )
  VALUES (?,?,?,?)`,
};
