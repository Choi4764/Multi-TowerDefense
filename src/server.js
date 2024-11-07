import net from 'net';
import { onConnection } from './events/onConnection.js';
import initServer from './init/index.js';
import { config } from './config/config.js';

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(config.server.port, config.server.host, () => {
      console.log(`Server listening on ${config.server.host}:${config.server.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
