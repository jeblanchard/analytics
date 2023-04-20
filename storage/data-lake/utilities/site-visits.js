function createFileNameForSiteVisit() {
    const currentUnixTime = Date.now()
    const nonce = createNonce()
    const fileType = 'txt'

    return `site-visit-${currentUnixTime}-${nonce}.${fileType}`
}

function createNonce() {
    return Math.floor(Math.random() * 100)
}

const util = require("util");
function getDataFromRequest(request) {
    return util.inspect(request)
}

module.exports = {
    createFileNameForSiteVisit,
    getDataFromRequest
}