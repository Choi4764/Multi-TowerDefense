import jwt from 'jsonwebtoken';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const createUser = async (id, password, email) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id, password, email]);
};

export const findUserById = async (id) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);

  return rows[0];
};
