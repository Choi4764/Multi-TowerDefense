import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserById = async (userId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [userId]);
  return toCamelCase(rows[0]);
};

// 사용자 생성 함수
export const createUser = async (email, userId, password) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [email, userId, password]);
  return { userId, email };
};

export const updateUserLogin = async (userId) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN_TIMESTAMP, [userId]);
};
