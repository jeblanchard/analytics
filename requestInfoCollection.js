function getCurrentUTCDate() {
    const milliSecondsSinceEpoch = Date.now()
    const localDate = new Date(milliSecondsSinceEpoch)
    return localDate.toUTCString()
}

const Db = require('./db/index')
const RequestIp = require('@supercharge/request-ip')

module.exports = storeRequestInformation

async function storeRequestInformation(request) {
    const clientIp = RequestIp.getClientIp(request)
    const receivedAt = getCurrentUTCDate()

    const insertVisitQuery =
        `INSERT INTO visits (client_ip_address, time_of_visit) 
        VALUES (\'${clientIp}\', \'${receivedAt}\');`

    let wrappedErr
    function queryCallback(err, result) {
        if (err) {
            wrappedErr = new Error(
                'Could not execute query',
                {cause: err}
            )
            console.error(wrappedErr.stack)
        } else {
            console.log('Successfully saved site visit')
        }
    }

    await Db.query(insertVisitQuery, [], queryCallback)

    return wrappedErr
}
