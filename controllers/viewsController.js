const catchAsync = require('../utils/catchAsync');
const Picture = require('../models/picture');
const Category = require('../models/category');
const Tag = require('../models/tag');
const User = require('../models/user');

exports.getMainPage = catchAsync(async (req, res, next) => {
  const pictures = await Picture.find();
  const categories = await Category.find().populate('number_of_pictures');
  const tags = await Tag.find().populate('number_of_pictures');
  const artists = await User.find().populate('number_of_pictures');

  res.status(200).render('main', {
    title: 'Головна',
    pictures,
    categories,
    tags,
    artists,
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
