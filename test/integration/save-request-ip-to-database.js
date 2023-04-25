const http = require("http");

const RequestIp = require('@supercharge/request-ip')

const { Pool } = require('pg');
let pgClientPool = new Pool ({
    user: 'postgres',
    password: 'password',
    host: 'localhost',
    database: 'analytics',
    port: '5432'
})

async function callback(response) {
    const clientIp = RequestIp.getClientIp(response.req)

    const checkForVisitQuery =
        `SELECT ALL FROM visits`

    let result
    try {
        result = await pgClientPool.query(checkForVisitQuery, [])
    } catch (err) {
        throw new Error('Could not query DB', {cause: err})
    }

    if (result.rows.length === 0) {
        throw new Error('Failed test. Query had no results.')
    } else {
        console.log('Test passed. DB was populated.')
    }

    const deleteVisitQuery = `DELETE FROM visits`
    try {
        await pgClientPool.query(deleteVisitQuery, [])
        console.log('Cleaned up DB table.')
    } catch (err) {
        throw new Error('Could not query DB', {cause: err})
    }

}

http.get('http://localhost:3000/', callback)