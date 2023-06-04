const catchAsync = require('./../utils/catchAsync');
const Picture = require('./../models/picture');
const Category = require('./../models/category');
const Tag = require('./../models/tag');

exports.getMainPage = catchAsync(async (req, res) => {
    const pictures = await Picture.find();
    const categories = await Category.find().populate('number_of_pictures');
    const tags = await Tag.find().populate('number_of_pictures');

    res.status(200).render('main', {
        title: 'Галерея',
        pictures,
        categories,
        tags
    });
});