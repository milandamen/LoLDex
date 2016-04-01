var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var User = require('mongoose').model('User');

router.route('/')
    .get(auth('admin'), function(req, res, next){
        User.find().exec(function(err, users){
            if(err){ return next(err); }
            res.json(users);
        });
    })

module.exports = router;    

