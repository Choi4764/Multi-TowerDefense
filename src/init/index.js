<<<<<<< HEAD

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
=======
import { loadProto } from './loadProto.js';

const initServer = async () => {
  try {
    loadProto();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
>>>>>>> 0e5798b (add: 헤더파서, 페이로드 역직렬화 등등)
