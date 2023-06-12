const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const User = require('./../models/user');
const Bought = require('./../models/bought');
const Picture = require('./../models/picture');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Завантажити можна лише фото', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

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

exports.addAvatar = catchAsync(async (req, res, next) => {
  if (!req.file) next();
  else {
    req.file.filename = `${uuidv4()}.jpeg`;
    req.body.avatar = req.file.filename;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/imgs/users/${req.file.filename}`);
    next();
  }
});

exports.deleteAvatar = catchAsync(async (req, res, next) => {
  if (req.user.avatar && req.user.avatar != 'default.png')
    try {
      await unlinkAsync(`public/imgs/users/${req.user.avatar}`);
    } catch (err) {
      console.log(err);
    }
  next();
});

exports.deleteUserConnects = catchAsync(async (req, res, next) => {
  await Bought.deleteMany({ user_id: req.user.id });

  if (req.user.role === 'artist')
    await Picture.updateMany({ artist_id: req.user.id }, { status: 'hidden' }, { new: true });

  next();
});

exports.uploadAvatar = upload.single('avatar');
//*

exports.getAllUsers = factory.getMany(User);
exports.getUser = factory.getOne(User);

exports.getCurrUser = factory.getOne(User);
exports.updateCurrUser = factory.updateOne(User, ['name', 'email', 'avatar']);
