const Bought = require('./../models/bought');
const catchAsync = require('./../utils/catchAsync');

exports.addBought = catchAsync(async (req, res, next) => {
    const item = await Bought.create({ ...req.body, user_id: req.user.id })

    res.status(201).json({
        status: "success",
        data: {
            item
        }
    })
})

exports.getAllBought = catchAsync(async (req, res, next) => {
    const items = await Bought.find().populate('picture');

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });
})

exports.getBought = catchAsync(async (req, res, next) => {
    const item = await Bought.findById(req.params.id).populate('picture');

    if (!item)
        next(new AppError('Bought not found', 404))
    else
        res.status(200).json({
            status: "success",
            data: {
                item
            }
        });
})

exports.deleteBought = catchAsync(async (req, res, next) => {
    const item = await Bought.findOneAndDelete({ _id: req.params.id });

    if (!item)
        next(new AppError('Bought not found', 404))
    else
        res.status(204).json({
            status: "success"
        });
})

exports.deleteAllBought = catchAsync(async (req, res, next) => {
    await Bought.deleteMany()

    res.status(204).json({
        status: "success"
    });
})