const Tag = require('./../models/tag');
const catchAsync = require('./../utils/catchAsync');

exports.addTag = catchAsync(async (req, res, next) => {
    const item = await Tag.create(req.body)

    res.status(201).json({
        status: "success",
        data: {
            item
        }
    })
})

exports.getAllTags = catchAsync(async (req, res, next) => {
    const items = await Tag.find();

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });
})

exports.getTag = catchAsync(async (req, res, next) => {
    const item = await Tag.findById(req.params.id);

    if (!item)
        next(new AppError('Tag not found', 404))
    else
        res.status(200).json({
            status: "success",
            data: {
                item
            }
        });
})

exports.editTag = catchAsync(async (req, res, next) => {
    const item = await Tag.findOneAndUpdate({ _id: req.params.id },
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

exports.deleteTag = catchAsync(async (req, res, next) => {
    const item = await Tag.findOneAndDelete({ _id: req.params.id });

    if (!item)
        next(new AppError('Tag not found', 404))
    else
        res.status(204).json({
            status: "success"
        });
})

exports.deleteAllTags = catchAsync(async (req, res, next) => {
    await Tag.deleteMany()

    res.status(204).json({
        status: "success"
    });
})