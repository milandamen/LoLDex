var configfile = {};

try {
    configfile = require('../config.json');
}
catch (error) {}

module.exports = {
    api_key: process.env.api_key || configfile.api_key,
    api_host: process.env.api_host || configfile.api_host,
    db_name: process.env.db_name || configfile.db_name,
    db_host: process.env.db_host || configfile.db_host,
    db_port: process.env.db_port || configfile.db_port
}
