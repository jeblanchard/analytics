function createFileNameForSiteVisit() {
    const currentUnixTime = Date.now()
    const nonce = createNonce()
    const fileType = 'txt'

    return `site-visit-${currentUnixTime}-${nonce}.${fileType}`
}

function createNonce() {
    return Math.floor(Math.random() * 100)
}

module.exports = {
    createFileNameForSiteVisit
}