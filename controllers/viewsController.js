const catchAsync = require('../utils/catchAsync');
const Picture = require('../models/picture');
const Category = require('../models/category');
const Tag = require('../models/tag');
const User = require('../models/user');
const APIFeatures = require('./../utils/apiFeatures');

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
    pictures = await Picture.find({ name: req.query.name });
  } else {
    const features = new APIFeatures(Picture.find(), req.query)
      .filter()
      .sort()
      .paginate();

    pictures = await features.query;
    query = features.queryObj;
  }

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
  res.status(200).render('login', {
    title: 'Авторизація',
  });
};

exports.getSignupPage = (req, res) => {
  res.status(200).render('signup', {
    title: 'Реєстрація',
  });
};

exports.getUpdateInfoPage = (req, res) => {
  res.status(200).render('update_info', {
    title: 'Редагування',
  });
};

exports.getUpdatePassPage = (req, res) => {
  res.status(200).render('update_pass', {
    title: 'Редагування',
  });
};
