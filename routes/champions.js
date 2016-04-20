var express = require('express');
var ext_api = require('../modules/ext_api');
var router = express.Router();

var response = null;                                     // Used in f_error for sending an error back to the client

router.route('/champions')
    .get(
        function(req, res, next) {
            if (req.accepts('html', 'json') !== 'json') {
                return next();
            };
            
            ext_api.get('champions', null, function(result) {
                res.json(result);
            }, function(errorObject) {
                if (errorObject.status_code == 404) { return next(); }
                res.status(errorObject.status_code).json(errorObject);
            });
        },
        function(req, res, next) {
            ext_api.get('champions', null, function(result) {
                var champions = [];
                Object.keys(result.data).forEach(function(val) {
                    champions.push(result.data[val]);
                });
                
                res.render('champions', {champions: champions});
            }, function(errorObject) {
                if (errorObject.status_code == 404) { return next(); }
                res.status(errorObject.status_code).json(errorObject);
            })
        }
    );

router.route('/champions/:id')
    .get(
        function(req, res, next) {
            if (req.accepts('html', 'json') !== 'json') {
                return next();
            };
            
            ext_api.get('champion', {id: req.params.id}, function(result) {
                res.json(result);
            }, function(errorObject) {
                if (errorObject.status_code == 404) { errorObject.error = 'Page not found' }
                res.status(errorObject.status_code).json(errorObject);
            });
        },
        function(req, res, next) {
            ext_api.get('champion', {id: req.params.id}, function(result) {
                res.render('champion', {champion: result});
            }, function(errorObject) {
                if (errorObject.status_code == 404) { return next(); }
                res.status(errorObject.status_code).json(errorObject);
            });
        }
    );

module.exports = router;    
