import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export function verifyToken(socket, token) {
  try {
    const decoded = jwt.verify(token, config.auth.key);
    return decoded;
  } catch (error) {
    socket.write("Invalid or expired token");
    throw new Error('Authentication failed');
  }
}
