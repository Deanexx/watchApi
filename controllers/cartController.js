const mongoose = require('mongoose'),
    catchAsync = require('./../utils/catchAsync'),
    AppError = require('./../utils/appError'),
    cartModel = require('./../models/cartModel.js');
    watchModel = require('./../models/watchModel.js');

exports.newCart = catchAsync(async (req, res, next) => {
    const cart = await cartModel.create({ items: [] });

    res.status(200).json({
        status: "success",
        data: {
            newCart: true,
            cart
        }
    })
})


exports.findCart = catchAsync(async (req, res, next) => {
        let flag = false;
        let cart = await cartModel.findById(req.params.token);

        if(!cart || cart.date < Date.now())
        {
            flag = true
            cart = await cartModel.create({ items: [] });
        }

        res.status(200).json({
            status: "success",
            data: {
                newCart: flag,
                cart
            }
        })
})

exports.removeCart = catchAsync(async (req, res, next) => {
    await cartModel.findByIdAndDelete(req.params.token);

    res.status(204).json({
        status: "success"
    })
})

exports.updateCart = catchAsync(async (req, res, next) => {
    const updatedCart = await cartModel.findByIdAndUpdate(req.params.token, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data:  {
            updatedCart
        }
    })
})

exports.beforeUpdateCart = catchAsync(async (req,res, next) => {
    let flag = false;
    let cart = await cartModel.findById(req.params.token);
    let cartItems = req.body;

    if(!cart)
        next(new AppError("Cart with this token does not exist", 404));

    for(let i = 0; i < cartItems.items.length; i++){
        let item = await watchModel.findById(cartItems.items[i].id_item);

        if(cartItems.items[i].cnt > item.cnt) flag = true;
    }

    if(flag)
        next(new AppError("You are trying add more items then it's in stack", 404));
    next();
})