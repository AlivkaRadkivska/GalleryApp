const Picture = require('./../models/picture');
const Liked = require('./../models/liked');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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
//*

exports.addPicture = factory.createOne(Picture);
exports.updatePicture = factory.updateOne(Picture, [
  'name',
  'category_id',
  'tag_ids',
  'status',
]);
exports.deletePicture = factory.deleteOne(Picture);

exports.getAllPictures = factory.getMany(Picture);
exports.getPicture = factory.getOne(Picture);

//!CHANGE
exports.getPicturesStats = catchAsync(async (req, res, next) => {
  const stats = await Picture.aggregate([
    {
      $group: {
        _id: null,
        numberOfPictures: { $sum: 1 },
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
