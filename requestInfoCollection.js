const Db = require('./storage/database')
const RequestIp = require('@supercharge/request-ip')

module.exports = {
    storeRequestIpAndTimeInDb
}

async function storeRequestIpAndTimeInDb(request) {
    const clientIp = RequestIp.getClientIp(request)
    const receivedAt = getCurrentUTCDate()

    const insertVisitQuery =
        `INSERT INTO visits (client_ip_address, time_of_visit) 
        VALUES (\'${clientIp}\', \'${receivedAt}\');`

    await Db.query(insertVisitQuery, [])
}

function getCurrentUTCDate() {
    const milliSecondsSinceEpoch = Date.now()
    const localDate = new Date(milliSecondsSinceEpoch)
    return localDate.toUTCString()
}
