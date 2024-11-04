import jwt from 'jsonwebtoken';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const createUser = async (id, password, email) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id, password, email]);
};

// TODO: throw new Error 말고 success랑 message, failCode에 대한 Response를 반환해야 함
export const login = async ({ id, password }) => {
  const user = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [id]);
  if (!user) {
    throw new Error(`${id} 유저가 존재하지 않습니다.`);
  }

  if (user.password !== password) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  const TEMP_SECRET_KEY = 'temporary_secret_key';

  const token = jwt.sign(user, TEMP_SECRET_KEY, { expiresIn: '1h' });

  // NOTE: 베어러 형식으로 줘야할까?
  // return token;
  return `Bearer ${token}`;
};
