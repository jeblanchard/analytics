const storeRequestInfo = require('./requestInfoCollection.js')

function requestListener(request, response) {
    storeRequestInfo(request)
    response.end()
    console.log('received request')
}

const http = require('http');
const server = http.createServer(requestListener);

const port = 3000;

server.listen(port, () => {
    console.log(`Server running`);
});
