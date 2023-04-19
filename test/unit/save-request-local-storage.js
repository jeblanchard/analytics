const http = require('http')
const basicRequest = http.request('http://localhost:3000')

const { saveToLocalStorage } = require("../../storage/data-lake/clients/local-storage");
const { createFileNameForSiteVisit } = require('../../storage/data-lake/utilities/filename-creator')
const fileName = createFileNameForSiteVisit()
const destFilePath = `./data/test/temp/${fileName}`
const { access, rm } = require('node:fs/promises')

async function saveBasicRequestToLocalStorage() {
    try {
        await saveToLocalStorage(basicRequest, destFilePath)
        await access(destFilePath)
        console.log('Test passed. Saved request to local storage.')
    } catch (err) {
        throw new Error('Test failed.', {cause: err})
    }

    try {
        await rm(destFilePath)
        console.log('Cleaned up files.')
    } catch (err) {
        throw new Error('Could not clean up test.', {cause: err})
    }
}

saveBasicRequestToLocalStorage()
