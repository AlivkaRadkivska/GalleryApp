const Category = require('./../models/category');
const catchAsync = require('./../utils/catchAsync');

exports.addCategory = catchAsync(async (req, res, next) => {
    const item = await Category.create(req.body)

    res.status(201).json({
        status: "success",
        data: {
            item
        }
    })
})

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const items = await Category.find().populate('pictures');

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });
})

exports.getCategory = catchAsync(async (req, res, next) => {
    const item = await Category.findById(req.params.id).populate('pictures');

    if (!item)
        next(new AppError('Category not found', 404))
    else
        res.status(200).json({
            status: "success",
            data: {
                item
            }
        });
})

exports.editCategory = catchAsync(async (req, res, next) => {
    const item = await Category.findOneAndUpdate({ _id: req.params.id },
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

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const item = await Category.findOneAndDelete({ _id: req.params.id }).populate('pictures');

    if (!item)
        next(new AppError('Category not found', 404))
    else
        res.status(204).json({
            status: "success"
        });
})

exports.deleteAllCategories = catchAsync(async (req, res, next) => {
    await Category.deleteMany().populate('pictures')

    res.status(204).json({
        status: "success"
    });
})