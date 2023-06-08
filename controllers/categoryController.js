const Category = require('./../models/category');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//*MIDDLEWARE
exports.checkUsingForDeleting = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id).populate(
    'number_of_pictures'
  );
  if (category.number_of_pictures > 0)
    next(
      new AppError('Ця категорія використовується, її не можна видалити', 400)
    );

  next();
});
//*

exports.addCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.getAllCategories = factory.getMany(Category);
exports.deleteCategory = factory.deleteOne(Category);
