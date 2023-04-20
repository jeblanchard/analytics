const dataLake = require('./storage/data-lake/data-lake-client.js')

const RequestIp = require('@supercharge/request-ip')
const { storeRequestIpAndTimeInDb } = require('./requestInfoCollection')
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
        const errMsg = `Could not save request info to data lake.`
        throw new Error(errMsg, {cause: err})
    }

    try {
        await storeRequestIpAndTimeInDb(request)
    } catch (err) {
        const errMsg = 'Could not save request IP and time to DB.'
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
