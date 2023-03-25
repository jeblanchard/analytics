const { Pool } = require('pg')

const clientPool = new Pool()

module.exports = {
    query: (text, params, callback) => clientPool.query(text, params, callback),
}
