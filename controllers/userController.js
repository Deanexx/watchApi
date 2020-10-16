const mongoose = require('mongoose'),
    userWatch = require('./../models/userModel'),
    catchAsync = require('./../utils/catchAsync'),
    AppError = require('./../utils/appError');

exports.createUser = function(req, res, next){
    console.log(req.body);
}