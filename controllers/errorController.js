const AppError = require('../utils/appError')

const handleDBError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

const handleDBDuplicateFields = err => {
    const val = Object.keys(err.keyValue);
    const message = `Duplicate field(s): ${val}. Please use another value`;
    return new AppError(message, 400);
}

const handleDBValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid data: ${errors.join('; ')}`;
    return new AppError(message, 400);
}

const handleJWTError = () => new AppError('Invalid token. Please log in again', 401);

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrProd = (err, res) => {
    if (err.isOperational)
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    else {
        console.error('ERROR', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong...'
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.ENV_MODE === 'development') {
        sendErrDev(err, res);
    } else if (process.env.ENV_MODE === 'production') {
        let error = { ...err };

        if (error.name === 'CastError') error = handleDBError(error);
        if (error.code === 11000) error = handleDBDuplicateFields(error);
        if (error.name === 'ValidationErro') error = handleDBValidationError(error);
        if (error.name === 'JsonWebToken' || error.name === 'TokenExpiredError')
            error = handleJWTError();

        sendErrProd(error, res);
    } else {
        next();
    }
}