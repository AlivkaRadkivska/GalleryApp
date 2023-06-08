const Tag = require('./../models/tag');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//*MIDDLEWARE
exports.checkUsingForDeleting = catchAsync(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id).populate('number_of_pictures');
  if (tag.number_of_pictures > 0)
    next(new AppError('Цей тег використовується, його не можна видалити', 400));

  next();
});
//*

exports.addTag = factory.createOne(Tag);
exports.updateTag = factory.updateOne(Tag);
exports.getAllTags = factory.getMany(Tag);
exports.deleteTag = factory.deleteOne(Tag);
