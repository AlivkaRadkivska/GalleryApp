const Liked = require('./../models/liked');
const catchAsync = require('./../utils/catchAsync');

exports.addLiked = catchAsync(async (req, res, next) => {
    const item = await Liked.create({ ...req.body, user_id: req.user.id })

    res.status(201).json({
        status: "success",
        data: {
            item
        }
    })
})

exports.getAllLiked = catchAsync(async (req, res, next) => {
    const items = await Liked.find().populate('picture');

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });
})

exports.getLiked = catchAsync(async (req, res, next) => {
    const item = await Liked.findById(req.params.id).populate('picture');

    if (!item)
        next(new AppError('Liked not found', 404))
    else
        res.status(200).json({
            status: "success",
            data: {
                item
            }
        });
})

exports.deleteLiked = catchAsync(async (req, res, next) => {
    const item = await Liked.findOneAndDelete({ _id: req.params.id });

    if (!item)
        next(new AppError('Liked not found', 404))
    else
        res.status(204).json({
            status: "success"
        });
})

exports.deleteAllLiked = catchAsync(async (req, res, next) => {
    await Liked.deleteMany()

    res.status(204).json({
        status: "success"
    });
})