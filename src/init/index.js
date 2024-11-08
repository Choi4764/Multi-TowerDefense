import { v4 as uuidv4 } from 'uuid';
import { loadProto } from './loadProtos.js';
import { testAllConnections } from '../utils/db/testConnection.js';
import pools from '../db/database.js';

const initServer = async () => {
  try {
    await loadProto();
    // await testAllConnections(pools);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default initServer;
