
const { Pool } = require('pg');
const dataBaseConfiguration = require('../config/db.config.js')

const pool = new Pool({
    user: dataBaseConfiguration.user,
    host: dataBaseConfiguration.host,
    database: dataBaseConfiguration.database,
    password: dataBaseConfiguration.password,
    port: dataBaseConfiguration.port, // Default PostgreSQL port
});

module.exports =  pool 