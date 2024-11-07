import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, HOST, PORT } from '../constants/env.js';
import {
  PACKET_TYPE_SIZE,
  PAYLOAD_LENGTH_SIZE,
  SEQUENCE_SIZE,
  VERSION_LENGTH_SIZE,
} from '../constants/header.js';

export const config = {
  server: {
    host: HOST,
    port: PORT,
  },
  database: {
    USER_DB: {
      name: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
  },
  header: {
    PACKET_TYPE_SIZE,
    VERSION_LENGTH_SIZE,
    SEQUENCE_SIZE,
    PAYLOAD_LENGTH_SIZE,
  },
};
