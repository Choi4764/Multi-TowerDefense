import { userSessions } from './sessions.js';
import User from '../classes/models/user.class.js';

export const addUser = (id, socket) => {
  const user = new User(id, socket);
  userSessions.push(user);
  console.log(`유저 추가 ${userSessions}`);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};

export const getUserBySocket = (socket) => {
  const user = userSessions.find((user) => user.socket === socket);

  if (!user) {
    throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다');
  }

  return user;
};

export const getNextSequence = (id) => {
  const user = getUserById(id);
  if (user) {
    return user.getNextSequence();
  }
  return null;
};
