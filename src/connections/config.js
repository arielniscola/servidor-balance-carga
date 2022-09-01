const path = require('path')
require('dotenv').config()

const configMariaDB = {
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        user: process.env.USER_MYSQL,
        port: process.env.PORT_MYSQL,
        password: process.env.PASS_MYSQL,
        database: 'ecommerce'
    },
    pool: {min: 0, max: 7}
}
const configSqlite = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../db/ecommerce.sqlite')
    },
    useNullAsDefault: true
}




module.exports = {
    configMariaDB,
    configSqlite
}