/*jslint node: true*/
var express = require('express'),
	authRoute = express.Router(),
	monogdb = require('mongodb').MongoClient,
    passport = require('passport');

var router = function () {
	'use strict';
	
	/*==pulling in the authcontroller==*/
	var authContoller = require('./controllers/authController')();
	/*==End of pulling in the authcontroller==*/
	
	/*==signin method==*/
	authRoute.route('/signIn')
		.all(function (req, res, next) {
			if (!req.user) {
				res.redirect('/');
			}
			next();
		})
		.post(passport.authenticate('local', {
			failureRedirect: "/auth/registerFail"
		}), function (req, res) {
			res.redirect('/users/profile');
		});
	/*==End of sign in Method==*/
	
	/*==routing to the registerfail page==*/
	authRoute.route('/registerFail')
		.all(function (req, res, next) {
			if (!req.user) {
				res.redirect('/');
			}
			next();
		})
		.get(authContoller.failure);
	/*==End of routing to the registerfail page==*/
	
	
	
	return authRoute;
};

module.exports = router;