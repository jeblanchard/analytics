const dataLake = require('./storage/data-lake/data-lake-client.js')

const RequestIp = require('@supercharge/request-ip')
async function requestListener(request, response) {
    const requestIp = RequestIp.getClientIp(request)
    if (requestIp) {
        console.log(`Received request from ${requestIp}`)
    } else {
        console.log('Received address but could not get IP.')
    }

    response.setHeader('Access-Control-Allow-Origin', '*')

    try {
        await dataLake.saveRequestToDataLake(request)
    } catch (err) {
        const errMsg = `Could not store request info`
        throw new Error(errMsg, {cause: err})
    }

    response.end()
    console.log(`Responded to request from ${requestIp}`)
}

const http = require('http');
const server = http.createServer(requestListener);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server running`);
});
