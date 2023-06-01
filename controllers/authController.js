const { promisify } = require('util');
const jwt = require("jsonwebtoken");
const User = require('./../models/user');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

const createToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const sendToken = (user, statusCode, res) => {
    const token = createToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    if (process.env.ENV_MODE === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions)

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const item = await User.create(req.body);

    sendToken(item, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(new AppError('Email and password are required', 400));

    const item = await User.findOne({ email }).select('+password');
    const check = await item.checkPassword(password, item.password);

    if (!item || !check)
        return next(new AppError('Incorrect email or password', 401));

    sendToken(item, 200, res);
})

exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', "")

    res.status(200).json({
        status: 'success'
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];

    if (!token)
        return next(new AppError('Access denied. Please log in'), 401);

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);

    if (!user)
        return next(new AppError('The user no longer exists', 404));

    if (user.changedPassword(decoded.iat))
        return next(new AppError('The user changed password. Please log in again', 401));

    req.user = user;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError('You do not have permission for this action', 403))

        next();
    }
}

exports.updatePassword = catchAsync(async (req, res, next) => {
    const item = await User.findById(req.user.id).select('+password');
    if (!(await item.checkPassword(req.body.curr_password, item.password)))
        return next(new AppError('Wrong password', 401));

    item.password = req.body.password;
    item.password_confirm = req.body.password_confirm;
    await item.save();

    sendToken(item, 200, res);
})