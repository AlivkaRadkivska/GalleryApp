const Bought = require('./../models/bought');
const Picture = require('./../models/picture');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//MIDDLEWARE
exports.checkAddingByOwner = catchAsync(async (req, res, next) => {
    const picture = await Picture.findById(req.body.picture);
    if (picture === null)
        next(new AppError('Не знайдено', 404));

    if (picture.artist_id === req.user.id)
        next(new AppError('Ви не можете придбати власну картину', 400))

    next();
});

exports.denyAccess = catchAsync(async (req, res, next) => {
    const bought = await Bought.findById(req.params.id);
    if (!bought)
        next(new AppError('Не знайдено', 404));

    if (bought.user_id != req.user.id)
        next(new AppError('Ви не можете взаємодіяти з цим записом', 403))

    next();
});

exports.addUser = (req, res, next) => {
    req.body.user_id = req.user.id;
    next();
};
//

exports.addBought = factory.createOne(Bought);
exports.getBought = factory.getOne(Bought);
exports.deleteBought = factory.deleteOne(Bought);

exports.getAllBought = factory.getMany(Bought); //ONLY FOR TEST
exports.deleteAllBought = factory.deleteMany(Bought); //ONLY FOR TEST