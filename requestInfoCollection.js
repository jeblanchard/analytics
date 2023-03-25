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

    const insertVisitQuery =
        `INSERT INTO visits (client_ip_address, time_of_visit) 
        VALUES (\'${clientIp}\', \'${receivedAt}\');`

    function queryCallback(err, result) {
        if (err) {
            console.error('Error executing query', err.stack)
            return
        }
        console.log('insert visit query was successful')
    }

    Db.query(insertVisitQuery, [], queryCallback)
}
