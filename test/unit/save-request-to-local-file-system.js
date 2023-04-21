const http = require("http");
const { access, rm} = require("node:fs/promises");
const { destFilePath } = require('../../storage/data-lake/clients/local-file-system')
const { saveToLocalFileSystem } = require('../../storage/data-lake/clients/local-file-system')

const dummyServer = http.createServer();
dummyServer.listen('3000');
const dummyRequest = http.request('http://localhost:3000')

async function saveRequest() {
    try {
        await saveToLocalFileSystem(dummyRequest)
        await access(destFilePath)
        console.log('Test passed. File was saved correctly.')
    } catch (err) {
        throw new Error('Test failed.', {cause: err})
    }

    try {
        await rm(destFilePath)
        console.log('Cleaned up file.')
    } catch (err) {
        throw new Error('Could not clean up test.', {cause: err})
    }
}

saveRequest()
