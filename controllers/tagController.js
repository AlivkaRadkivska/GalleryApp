const Tag = require('./../models/tag');
const Picture = require('./../models/picture');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//MIDDLEWARE
exports.checkUsingForDeleting = catchAsync(async (req, res, next) => {
    console.log(req.params.id)
    const picture = await Picture.findOne({ tag_ids: req.params.id });
    console.log(picture)
    if (picture)
        next(new AppError('Цей тег використовується, його не можна видалити', 400));

    next();
});
//

exports.addTag = factory.createOne(Tag);
exports.updateTag = factory.updateOne(Tag);
exports.getAllTags = factory.getMany(Tag);
exports.deleteTag = factory.deleteOne(Tag);

//ONLY FOR TEST
exports.deleteAllTags = factory.deleteMany(Tag);