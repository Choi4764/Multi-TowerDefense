export const SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM user WHERE userId = ?',
  CREATE_USER: 'INSERT INTO user (userId, email, password) VALUES (?, ?, ?)',
  UPDATE_USER_LOGIN_TIMESTAMP: 'UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE userId = ?',
};
