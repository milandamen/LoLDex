var configfile = {};

try {
    configfile = require('../config.json');
}
catch (error) {}

module.exports = {
    api_key: process.env.api_key || configfile.api_key || 'b725dd4e-3669-4805-8e86-217f53183a2c',
    api_host: process.env.api_host || configfile.api_host || 'https://na.api.pvp.net',
    db_name: process.env.db_name || configfile.db_name || 'loldex',
    db_host: process.env.db_host || configfile.db_host || 'loldex:RDw8xqt5oBsC3XPR@ds013340.mlab.com',
    db_port: process.env.db_port || configfile.db_port || 13340
}
