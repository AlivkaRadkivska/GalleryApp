const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const filterObj = require('./../utils/filterObject');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const item = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        item,
      },
    });
  });

exports.updateOne = (Model, allowedFields = null) =>
  catchAsync(async (req, res, next) => {
    body = req.body;
    if (allowedFields) body = filterObj(req.body, allowedFields);

    console.log(body);
    const item = await Model.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!item) next(new AppError('Не знайдено', 404));
    else
      res.status(200).json({
        status: 'success',
        data: {
          item,
        },
      });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const item = await Model.findById(req.params.id);

    if (!item) next(new AppError('Не знайдено', 404));
    else
      res.status(200).json({
        status: 'success',
        data: {
          item,
        },
      });
  });

exports.getMany = (Model, params = {}) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(params), req.query)
      .filter()
      .sort()
      .paginate();

    const items = await features.query;

    if (!items) next(new AppError('Не знайдено', 404));
    else
      res.status(200).json({
        status: 'success',
        number: items.length,
        data: {
          items,
        },
      });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const item = await Model.findByIdAndDelete(req.params.id);

    if (!item) next(new AppError('Не знайдено', 404));
    else
      res.status(204).json({
        status: 'success',
      });
  });

exports.deleteMany = (Model, params = {}) =>
  catchAsync(async (req, res, next) => {
    await Model.deleteMany(params);

    res.status(204).json({
      status: 'success',
    });
  });
