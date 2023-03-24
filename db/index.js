const { Pool } = require('pg')

const clientPool = new Pool()

module.exports = {
    query: (text, params) => clientPool.query(text, params),
}
