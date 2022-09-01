require("dotenv").config();

module.exports = {
    user_mysql: process.env.USER_MYSQL,
    pass_mysql: process.env.PASS_MYSQL,
    port_mysql: process.env.PORT_MYSQL,
    mongo_connection: process.env.MONGO_CONNECTION,
};