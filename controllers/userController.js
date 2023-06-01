const User = require('./../models/user');
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })

    return newObj;
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const items = await User.find().populate('bought').populate('liked').populate('pictures');

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });
})

exports.getUser = catchAsync(async (req, res, next) => {
    const item = await User.findById(req.params.id).populate('bought').populate('liked').populate('pictures');

    res.status(200).json({
        status: "success",
        data: {
            item
        }
    });
})

exports.getCurrUser = catchAsync(async (req, res, next) => {
    const item = await User.findById(req.user.id).populate('bought').populate('liked').populate('pictures');

    res.status(200).json({
        status: "success",
        data: {
            item
        }
    });
})

exports.updateCurrUser = catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.password_confirm)
        next(new AppError('You can not update password here', 400))

    const filteredBody = filterObj(req.body, 'name', 'email', 'avatar');
    const item = await User.findByIdAndUpdate(req.user.id,
        filteredBody,
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

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id });

    res.status(204).json({
        status: "success"
    });
})

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
    await User.deleteMany()

    res.status(204).json({
        status: "success"
    });
})