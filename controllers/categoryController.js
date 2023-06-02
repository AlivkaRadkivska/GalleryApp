const Category = require('./../models/category');
const Picture = require('./../models/picture');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//MIDDLEWARE
exports.checkUsingForDeleting = catchAsync(async (req, res, next) => {
    const picture = await Picture.findOne({ category_id: req.params.id });
    if (picture)
        next(new AppError('Ця категорія використовується, її не можна видалити', 400));

    next();
});
//

exports.addCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.getAllCategories = factory.getMany(Category);
exports.deleteCategory = factory.deleteOne(Category);

//ONLY FOR TEST
exports.deleteAllCategories = factory.deleteMany(Category);