const storeRequestInfo = require('./requestInfoCollection.js')

function requestListener(request, response) {
    console.log('Received request')
    console.log(request)

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

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server running`);
});
