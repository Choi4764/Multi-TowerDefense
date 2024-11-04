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
