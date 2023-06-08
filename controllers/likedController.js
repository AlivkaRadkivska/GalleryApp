const Liked = require('./../models/liked');
const Picture = require('./../models/picture');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//*MIDDLEWARE
exports.checkAddingByOwner = catchAsync(async (req, res, next) => {
  const picture = await Picture.findById(req.body.picture_id);
  if (picture === null) next(new AppError('Не знайдено', 404));

  if (picture.artist_id === req.user.id)
    next(new AppError('Ви не можете вподобати власну картину', 400));

  next();
});

exports.denyAccess = catchAsync(async (req, res, next) => {
  const liked = await Liked.findById(req.params.id);
  if (!liked) next(new AppError('Не знайдено', 404));

  if (liked.user_id != req.user.id)
    next(new AppError('Ви не можете взаємодіяти з цим записом', 403));

  next();
});

exports.addUser = (req, res, next) => {
  req.body.user_id = req.user.id;
  next();
};
//*

exports.addLiked = factory.createOne(Liked);
exports.getLiked = factory.getOne(Liked);
exports.deleteLiked = factory.deleteOne(Liked);

exports.getAllLiked = factory.getMany(Liked); //!ONLY FOR TEST
