module.exports = {
    tempSaveToLocalStorage
}

const fsPromises = require('node:fs/promises')
const siteVisits = require('../utilities/site-visits')
const {rm} = require("node:fs/promises");
async function tempSaveToLocalStorage(request, destFilePath) {
    const data = siteVisits.getDataFromRequest(request)
    try {
        const fileHandle = await fsPromises.open(destFilePath, 'a+')
        await fileHandle.writeFile(data)
        await fileHandle.close()
        console.log('Saved request to local storage.')
    } catch (err) {
        throw new Error('Could not save to local file system', {cause: err})
    }

    try {
        await rm(destFilePath)
        console.log('Cleaned up files.')
    } catch (err) {
        throw new Error('Could not clean up test.', {cause: err})
    }
}
