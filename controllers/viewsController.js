const catchAsync = require('../utils/catchAsync');
const Picture = require('../models/picture');
const Category = require('../models/category');
const Tag = require('../models/tag');
const User = require('../models/user');
const Bought = require('../models/bought');
const APIFeatures = require('./../utils/apiFeatures');
const mongoose = require('mongoose');

const fileName = `db-backup_${Date.now()}.json`;

exports.regexSearch = (req, res, next) => {
  if (req.query.search) {
    req.query.name = { $regex: req.query.search, $options: 'i' };
    req.query.search = undefined;
  }

  next();
};

exports.getMainPage = catchAsync(async (req, res, next) => {
  const categories = await Category.find().populate('number_of_pictures');
  const tags = await Tag.find().populate('number_of_pictures');
  const artists = await User.find().populate('number_of_pictures');
  let pictures;
  let query = {};

  if (req.query.name) {
    pictures = await Picture.find({ name: req.query.name, status: 'active' });
    query.max_pages = Math.ceil(pictures.length / 9);
  } else {
    const features = new APIFeatures(Picture.find({ status: 'active' }), req.query)
      .filter()
      .sort()
      .paginate();

    pictures = await features.query;
    query = features.queryObj;
    if (!features.queryObj.max_pages)
      query.max_pages = Math.ceil((await Picture.find(features.queryParams).countDocuments()) / 9);
  }
  console.log(query);

  if (req.query)
    res.status(200).render('main', {
      title: 'Головна',
      pictures,
      categories,
      tags,
      artists,
      query,
    });
});

exports.getLoginPage = (req, res) => {
  res.status(200).render('user/login', {
    title: 'Авторизація',
  });
};

exports.getSignupPage = (req, res) => {
  res.status(200).render('user/signup', {
    title: 'Реєстрація',
  });
};

exports.getUpdateInfoPage = (req, res) => {
  res.status(200).render('user/update_info', {
    title: 'Редагування',
  });
};

exports.getUpdatePassPage = (req, res) => {
  res.status(200).render('user/update_pass', {
    title: 'Редагування',
  });
};

exports.getAdminTables = catchAsync(async (req, res, next) => {
  const categories = await Category.find().populate('number_of_pictures');
  const tags = await Tag.find().populate('number_of_pictures');
  const pictures_to_confirm = await Picture.find({ status: 'checking' });

  if (req.query)
    res.status(200).render('admin/panel', {
      title: 'Панель адміністратора',
      categories,
      tags,
      pictures_to_confirm,
    });
});

exports.getBackup = catchAsync(async (req, res, next) => {
  const models = Object.values(mongoose.connection.models);
  let counter = models.length;

  res.attachment(fileName);
  res.write('[');

  for (const model of models) {
    const data = await model.aggregate([
      {
        $match: {},
      },
    ]);

    const signature = {
      collection: model.collection.collectionName,
      timestamp: Date.now(),
    };

    const result = { data, signature };
    res.write(JSON.stringify(result) + (counter-- > 1 ? ',' : ''));
  }

  res.write(']');
  res.end();
});

exports.getArtistPictures = catchAsync(async (req, res, next) => {
  const pictures = await Picture.find({ artist_id: req.user.id }).sort('-status');

  if (req.query)
    res.status(200).render('artist/panel', {
      title: 'Художня майстерня',
      pictures,
    });
});

exports.getPicturePage = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  const tags = await Tag.find();

  if (req.params.id) {
    const picture = await Picture.findById(req.params.id);

    if (req.query)
      res.status(200).render('picture/form', {
        title: 'Редагування даних картини',
        picture,
        categories,
        tags,
      });
  } else {
    if (req.query)
      res.status(200).render('picture/form', {
        title: 'Додавання картини',
        categories,
        tags,
      });
  }
});

exports.getBoughtPage = catchAsync(async (req, res, next) => {
  const bought = await Bought.find({ user_id: req.user.id }).sort('-adding_date');

  if (req.query)
    res.status(200).render('user/bought', {
      title: 'Куплені картини',
      bought,
    });
});
