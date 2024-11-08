import { PORT, HOST, CLIENT_VERSION, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, JWT_SECRET } from '../constants/env.js';
import { PACKET_TYPE_SIZE, PAYLOAD_LENGTH_SIZE, SEQUENCE_SIZE, VERSION_LENGTH_SIZE } from '../constants/header.js';

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  header: {
    PACKET_TYPE_SIZE,
    VERSION_LENGTH_SIZE,
    SEQUENCE_SIZE,
    PAYLOAD_LENGTH_SIZE
  },
  databases: {
    USER_DB: {
      name: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
  },
  auth: {
    key : JWT_SECRET
  },
};