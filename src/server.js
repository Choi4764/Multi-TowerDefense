import net from 'net';
import { PORT, HOST } from './constants/env.js';

const server = net.createServer();

server.listen(PORT, HOST, () => {
    console.log(`서버가 ${HOST}:${PORT}에서 실행 중 입니다. `);
});