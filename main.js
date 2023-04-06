const storeRequestInfo = require('./requestInfoCollection.js')

function requestListener(request, response) {
    console.log('Received request')

    storeRequestInfo(request).then((err) => {
        if (err) {
            response.statusCode = 500
            const wrappedErr = new Error('Could not store request info', {cause: err})
            console.log(wrappedErr)
        }
    })

    response.end()
    console.log('Responded to request')
}

const http = require('http');
const server = http.createServer(requestListener);

const port = 3000;

server.listen(port, () => {
    console.log(`Server running`);
});
