function getCurrentUTCDate() {
    const milliSecondsSinceEpoch = Date.now()
    const localDate = new Date(milliSecondsSinceEpoch)
    return localDate.toUTCString()
}

const Db = require('./db/index')
const RequestIp = require('@supercharge/request-ip')
module.exports =  function storeRequestInformation(request) {
    const clientIp = RequestIp.getClientIp(request)
    const receivedAt = getCurrentUTCDate()

    Db.query()  // finish later
}

