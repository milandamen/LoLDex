var express = require('express');
var ext_api = require('../modules/ext_api');
var router = express.Router();

var response = null;                                     // Used in f_error for sending an error back to the client

// This API has the following routes:
// /
// /champions

router.route('/')
    .get(function(req, res, next) {
        res.send('Home page');
    });

router.route('/champions')
    .get(function(req, res, next) {
        response = res;
        
        ext_api.get('champions', null, function(result) {
            res.json(result);
        }, function(errorObject) {
            res.status(errorObject.status_code).json(errorObject);
        });
    });

router.route('/champions/:id')
    .get(function(req, res, next) {
        response = res;
        
        ext_api.get('champion', {id: req.params.id}, function(result) {
            res.json(result);
        }, function(errorObject) {
            res.status(errorObject.status_code).json(errorObject);
        });
    });
    
router.route('/web/champions')
    .get(function(req, res, next) {
        response = res;
        
        ext_api.get('champions', null, function(result) {
            var champions = [];
            Object.keys(result.data).forEach(function(val) {
                champions.push(result.data[val]);
            });
            
            res.render('champions', {champions: champions});
        }, function(errorObject) {
            res.status(errorObject.status_code).json(errorObject);
        })
    });

module.exports = router;    
