const mongoose = require('mongoose'),
    modelWatch = require('./../models/watchModel'),
    catchAsync = require('./../utils/catchAsync'),
    AppError = require('./../utils/appError');

exports.getAllWatches = catchAsync( async (req, res, next) =>
    {
        const watches = await modelWatch.find();

        res.status(200).json({
            status: "success",
            data: {
                watches
            }
        })
})

exports.getWatch = catchAsync(async (req, res, next) => {
    const watch = await modelWatch.findById(req.params.id);

    if(!watch)
        return next(new AppError('No watch found with that id'))

    res.status(200).json({
        status: "success",
        data: {
            watch
        }
    })
})

exports.createWatch = catchAsync( async (req, res, next) => {
    const watch = await modelWatch.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            watch
        }
    })
})