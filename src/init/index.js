import { loadProto } from './loadProto.js';
import { testConnection } from '../utils/db/testConnection.js';

const initServer = async () => {
  try {
    loadProto();
    await testConnection();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
