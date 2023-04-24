
module.exports = {
    uploadSiteVisitToDataLake,
}

const { getUniqueSiteVisitFileName, getDataFromRequest } = require('../utilities/site-visits')
async function uploadSiteVisitToDataLake(request) {
    const destFileName = getUniqueSiteVisitFileName();
    const data = getDataFromRequest(request)

    try {
        await uploadFromMemory(destFileName, getDataFromRequest())
    } catch (err) {
        throw new Error('Could not upload request from memory', {cause: err})
    }
}

const { Storage } = require('@google-cloud/storage')
const projectId = 'personal-website-382920';
const cloudStorage = new Storage({projectId});
const bucketName = process.env.GCLOUD_BUCKET_NAME

async function uploadFromMemory(destFileName, contents) {
    await cloudStorage.bucket(bucketName).file(destFileName).save(contents);

    console.log(
        `${destFileName} uploaded to ${bucketName}.`
    );
}
