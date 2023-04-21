const fsPromises = require('node:fs/promises')
const siteVisits = require('../utilities/site-visits')
const { getUniqueSiteVisitFileName } = require('../utilities/site-visits')
const destFileName = getUniqueSiteVisitFileName()
const destFilePath = `./data/test/temp/${destFileName}`

async function saveToLocalFileSystem(request) {
    const data = siteVisits.getDataFromRequest(request)
    try {
        const fileHandle = await fsPromises.open(destFilePath, 'a+')
        await fileHandle.writeFile(data)
        await fileHandle.close()
        console.log('Saved request to local storage.')
    } catch (err) {
        throw new Error('Could not save to local file system', {cause: err})
    }
}

module.exports = {
    saveToLocalFileSystem,
    destFilePath
}
