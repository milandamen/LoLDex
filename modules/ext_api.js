var request = require('request');
var config = require('../modules/config');

module.exports = {
    routes: {
        champions: '/api/lol/static-data/euw/v1.2/champion?',
        champion: '/api/lol/static-data/euw/v1.2/champion/:id?champData=all&'
    },
    get: function(api_route, params, success, error) {
        var url = config.api_host + this.routes[api_route] + 'api_key=' + config.api_key;
        if (params !== null && params.id && url.indexOf(':id') > -1) {
            url = url.replace(':id', params.id);                    // Replace :id in the url with the given id from the route
        }
        
        console.log(url);
        
        request({
            url: url,
            json: true
        }, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                success(body);                                      // Let the success callback handle the response
            } else {
                error({                                             // Let the error callback handle the error
                    status_code: 500,
                    error: err
                });
            }
        });
    }
}
