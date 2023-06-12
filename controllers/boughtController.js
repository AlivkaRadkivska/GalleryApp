const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Bought = require('./../models/bought');
const Picture = require('./../models/picture');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//*MIDDLEWARE
exports.checkAddingByOwner = catchAsync(async (req, res, next) => {
  const picture = await Picture.findById(req.params.id);
  if (picture === null) next(new AppError('Не знайдено', 404));

  if (picture.artist_id === req.user.id)
    next(new AppError('Ви не можете придбати власну картину', 400));

  next();
});

exports.denyAccess = catchAsync(async (req, res, next) => {
  const bought = await Bought.findById(req.params.id);
  if (!bought) next(new AppError('Не знайдено', 404));

  if (bought.user_id != req.user.id)
    next(new AppError('Ви не можете взаємодіяти з цим записом', 403));

  next();
});

exports.addUser = (req, res, next) => {
  req.body.user_id = req.user.id;
  next();
};
//*

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const picture = await Picture.findById(req.params.id);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/bought?user_id=${req.user.id}&picture_id=${
      req.params.id
    }`,
    cancel_url: `${req.protocol}://${req.get('host')}/`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(picture.price * 100),
          product_data: {
            name: picture.name,
          },
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.addBought = catchAsync(async (req, res, next) => {
  const { user_id, picture_id } = req.query;
  if (!user_id || !picture_id) return next();
  const picture = await Picture.findById(picture_id);

  await Bought.create({ user_id, picture_id, spent: picture.price });
  res.redirect(req.originalUrl.split('?')[0]);
});
