const gCloud = require('./client-implementations/google-cloud')
const localStorage = require('./client-implementations/test-local-file-system')

async function saveRequestToDataLake(request) {
    try {
        await saveToCorrectLake(request)
    } catch (err) {
        throw new Error('Could not save to correct location', {cause: err})
    }
}

async function saveToCorrectLake(request) {
    if (process.env.DATA_LAKE_ENV === 'local') {
        await localStorage.saveToLocalFileSystem(request)
    } else if (process.env.DATA_LAKE_ENV === 'production') {
        await gCloud.uploadSiteVisitToDataLake(request)
    } else {
        throw new Error('DATA_LAKE_ENV not set.')
    }
}

module.exports = {
    saveRequestToDataLake
}
