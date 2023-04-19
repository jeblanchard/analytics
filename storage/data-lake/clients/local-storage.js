module.exports = {
    saveToLocalStorage,
}

const fsPromises = require('node:fs/promises')
async function saveToLocalStorage(request, destFilePath) {
    const data = JSON.stringify(request)
    try {
        const fileHandle = await fsPromises.open(destFilePath, 'a+')
        await fileHandle.writeFile(data)
        await fileHandle.close()
    } catch (err) {
        throw new Error('Could not save to local file system', {cause: err})
    }
}
