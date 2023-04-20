const gCloud = require('./clients/google-cloud')
const localStorage = require('./clients/temp-local')

async function saveRequestToDataLake(request) {
    try {
        await saveToCorrectLake(request)
    } catch (err) {
        throw new Error('Could not save to correct location', {cause: err})
    }
}

const { createFileNameForSiteVisit } = require('./utilities/site-visits')
async function saveToCorrectLake(request) {
    if (process.env.DATA_LAKE_ENV === 'local') {
        const destFileName = createFileNameForSiteVisit()
        const destFilePath = `./data/test/temp/${destFileName}`
        await localStorage.tempSaveToLocalStorage(request, destFilePath)
    } else if (process.env.DATA_LAKE_ENV === 'production') {
        await gCloud.uploadSiteVisitToDataLake(request)
    } else {
        throw new Error('DATA_LAKE_ENV not set.')
    }
}

module.exports = {
    saveRequestToDataLake
}
