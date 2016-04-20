var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');
var User = require('mongoose').model('User');

//router.route('/')
    //.get(auth('admin'), function(req, res, next){
        //User.find().exec(function(err, users){
            //if(err){ return next(err); }
            //res.json(users);
        //});
    //})

module.exports = function(passport) {
    router.route('/')
        .get(function(req, res) {
            res.render('index');
        });
    
    router.route('/login')
        .get(function(req, res) {
            res.render('login', { message: req.flash('loginMessage') } );
        })
        .post(passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login',   // redirect back to the signup page if there is an error
            failureFlash : true           // allow flash messages
        }));
    
    router.route('/signup')
        .get(function(req, res) {
            res.render('signup', { message: req.flash('signupMessage') });
        })
        .post(passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    
    router.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.render('profile', {
                user : req.user // get the user out of session and pass to template
            });
        })
    
    router.route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
        })
    
    
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
    
    return router;
}

