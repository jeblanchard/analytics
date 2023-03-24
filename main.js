const storeRequestInfo = require('./requestInfoCollection.js')

function requestListener(request, response) {
    storeRequestInfo(request)
    response.end('Received')
    console.log('got request')
}

const http = require('http');
const server = http.createServer(requestListener);

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
