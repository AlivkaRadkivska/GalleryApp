const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const Picture = require('./../models/picture');
const Liked = require('./../models/liked');
const Bought = require('./../models/bought');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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
exports.checkArtist = catchAsync(async (req, res, next) => {
  const picture = await Picture.findById(req.params.id);
  if (!picture) next(new AppError('Не знайдено', 404));

  if (picture.artist_id != req.user.id)
    next(new AppError('Ви не маєте доступу до чужих картин', 403));

  next();
});

exports.addArtist = (req, res, next) => {
  req.body.artist_id = req.user.id;
  next();
};

exports.deletePictureConnects = catchAsync(async (req, res, next) => {
  await Liked.deleteMany({ picture_id: req.user.id });
  next();
});

exports.addImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const imgName = `${uuidv4()}.${req.file.mimetype.split('/')[1]}`;
  req.body.image = imgName;
  await sharp(req.file.buffer).toFile(`public/imgs/pictures/full/${imgName}`);

  const demoName = `${uuidv4()}.png`;
  req.body.demo = demoName;
  sharp(req.file.buffer)
    .composite([{ input: './public/imgs/logo.png', gravity: 'southeast' }])
    .resize({
      fit: sharp.fit.contain,
      width: 500,
    })
    .png({ quality: 80 })
    .toFile(`public/imgs/pictures/demo/${demoName}`);

  next();
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const picture = await Picture.findById(req.params.id);
  const bought = await Bought.findOne({ picture: { image: picture.image } });
  if (!bought)
    try {
      await unlinkAsync(`public/imgs/pictures/demo/${picture.demo}`);
      await unlinkAsync(`public/imgs/pictures/full/${picture.image}`);
    } catch (err) {
      console.log(err);
    }

  next();
});

exports.upload = upload.single('image');
//*

exports.addPicture = factory.createOne(Picture);
exports.updatePicture = factory.updateOne(Picture, [
  'name',
  'category_id',
  'tag_ids',
  'price',
  'format',
]);
exports.updatePictureStatus = factory.updateOne(Picture, ['status', 'message']);
exports.deletePicture = factory.deleteOne(Picture);

exports.getAllPictures = factory.getMany(Picture);
exports.getPicture = factory.getOne(Picture);

//!CHANGE
exports.getPicturesStats = catchAsync(async (req, res, next) => {
  const stats = await Picture.aggregate([
    {
      $group: {
        _id: null,
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
//!
