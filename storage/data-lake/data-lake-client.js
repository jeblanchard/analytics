const gCloud = require('./clients/google-cloud')
const localStorage = require('./clients/local-storage')

async function saveRequestToDataLake(request) {
    try {
        await saveToCorrectLake(request)
    } catch (err) {
        throw new Error('Could not save to correct location', {cause: err})
    }
}

async function saveToCorrectLake(request) {
    if (process.env.DATA_LAKE_ENV === 'local') {
        await localStorage.saveToLocalStorage(request)
    } else if (process.env.DATA_LAKE_ENV === 'production') {
        await gCloud.uploadSiteVisitToDataLake(request)
    }
}

module.exports = {
    saveRequestToDataLake
}
