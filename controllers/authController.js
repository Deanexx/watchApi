const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const validator = require('validator');

function signToken(id){
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        login: req.body.login,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        email: req.body.email
    })

    createSendToken(newUser, 201, res);
})

exports.login = catchAsync( async (req, res, next) => {
    const { email, password } = req.body;

    if(!validator.isEmail(email) || !password)
        AppError('Please provide valid email and password', 400);

    const user = await User.findOne({ email }).select('+password');
    if(!user || !(await user.checkPassword(password, user.password)))
        AppError("Please provide correct email or password !")
    createSendToken(user, 200, res);
})

exports.protect = catchAsync( async ( req, res, next) => {
    //1) Check token and check if it's there

    //2) Validate token

    //3) Check if user is exist

    //4) Check if user changed password after JWT wat issued
    next();

})