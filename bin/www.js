const http = require('http');
const serverHandler = require('../app');

const PORT = 3001;

const server = http.createServer(serverHandler);

server.listen(PORT);
