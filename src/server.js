import net from 'net';
import { onConnection } from './events/onConnection.js';
import { config } from './config/config.js';
import initServer from './init/index.js';

const server = net.createServer(onConnection);

initServer().then(() => {
  server.listen(config.server.port, config.server.host, () => {
    console.log(`listening on ${config.server.host}:${config.server.port}`);
  });
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
