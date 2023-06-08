const User = require('./../models/user');
const Liked = require('./../models/liked');
const Bought = require('./../models/bought');
const Picture = require('./../models/picture');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

//*MIDDLEWARE
exports.setCurrUser = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.checkPasswordUpdating = (req, res, next) => {
  if (req.body.password || req.body.password_confirm)
    next(new AppError('Ви не можете змінити пароль тут', 400));
  next();
};

exports.deleteUserConnects = catchAsync(async (req, res, next) => {
  await Liked.deleteMany({ user_id: req.user.id });
  await Bought.deleteMany({ user_id: req.user.id });
  await Picture.deleteMany({ artist_id: req.user.id });

  next();
});
//*

exports.getAllUsers = factory.getMany(User);
exports.getUser = factory.getOne(User);

exports.getCurrUser = factory.getOne(User);
exports.updateCurrUser = factory.updateOne(User, ['name', 'email', 'avatar']);
