import { verifyToken } from '../middleware/authMiddleware.js';

export async function protectedHandler({ socket, payload }) {
  const { token } = payload;

  let decoded;
  try {
    decoded = verifyToken(socket, token);
  } catch (error) {
    return;
  }

  const userId = decoded.id;
  const email = decoded.email;
}
