const storeRequestInfo = require('./requestInfoCollection.js')

function requestListener(request, response) {
    console.log('Received request')

    const storeRequestErr = storeRequestInfo(request)
    if (storeRequestErr) {
        console.log("entered this mf")
        response.statusCode = 500
    }

    response.end()
}

const http = require('http');
const server = http.createServer(requestListener);

const port = 3000;

server.listen(port, () => {
    console.log(`Server running`);
});
