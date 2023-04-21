const fileNamePrefix = 'site-visit'

function getUniqueSiteVisitFileName() {
    const currentUnixTime = Date.now()
    const nonce = createNonce()
    const fileType = 'txt'

    return `${fileNamePrefix}-${currentUnixTime}-${nonce}.${fileType}`
}

function createNonce() {
    return Math.floor(Math.random() * 100)
}

const util = require("util");
function getDataFromRequest(request) {
    return util.inspect(request)
}

module.exports = {
    getUniqueSiteVisitFileName,
    getDataFromRequest,
    fileNamePrefix
}