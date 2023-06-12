const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

const Picture = require('./../models/picture');
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
  const picture = await Picture.findById(req.params.id).populate('buying_count');
  if (picture.buying_count == 0)
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
exports.deletePicture = catchAsync(async (req, res, next) => {
  const item = await Picture.findById(req.params.id).populate('buying_count');

  if (!item) next(new AppError('Не знайдено', 404));

  if (item.buying_count > 0)
    await Picture.findByIdAndUpdate(req.params.id, { status: 'hidden' }, { new: true });
  else await Picture.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});

exports.getAllPictures = factory.getMany(Picture);
exports.getPicture = factory.getOne(Picture);
