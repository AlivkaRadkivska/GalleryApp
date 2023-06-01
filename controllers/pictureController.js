const Picture = require('./../models/picture');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('../utils/appError')

exports.addPicture = catchAsync(async (req, res, next) => {
    const item = await Picture.create({ ...req.body, artist_id: req.user.id });

    res.status(201).json({
        status: "success",
        data: {
            item
        }
    })
})

exports.getAllPictures = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Picture.find(), req.query)
        .filter()
        .sort()
        .paginate();

    const items = await features.query.populate('category').populate('artist');

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });

})

exports.getPicturesStats = catchAsync(async (req, res, next) => {
    const stats = await Picture.aggregate([
        // { $match: { status: 'active' } },
        {
            $group: {
                // _id: { $toUpper: '$category' },
                _id: null,
                numberOfPictures: { $sum: 1 },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            }
        }
    ]);

    res.status(200).json({
        status: "success",
        data: {
            stats
        }
    });
})

exports.getPicture = catchAsync(async (req, res, next) => {
    const item = await Picture.findById(req.params.id);

    if (!item)
        next(new AppError('Picture not found', 404))
    else
        res.status(200).json({
            status: "success",
            data: {
                item
            }
        });
})

exports.editPicture = catchAsync(async (req, res, next) => {
    // const item = await Picture.findOneAndUpdate({ _id: req.params.id, artist: req.user._id },
    const item = await Picture.findOneAndUpdate({ _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true
        })

    res.status(200).json({
        status: "success",
        data: {
            item
        }
    });
})

exports.deletePicture = catchAsync(async (req, res, next) => {
    //const item = await Picture.findOneAndDelete({ _id: req.params.id, artist: req.user._id });
    const item = await Picture.findOneAndDelete({ _id: req.params.id });

    if (!item)
        next(new AppError('Picture not found', 404))
    else
        res.status(204).json({
            status: "success"
        });
})

exports.deleteAllPictures = catchAsync(async (req, res, next) => {
    await Picture.deleteMany()

    res.status(204).json({
        status: "success"
    });
})