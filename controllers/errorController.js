const AppError = require('../utils/appError');

const handleDBError = (err) => {
  const message = `${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDBDuplicateFields = (err) => {
  const val = Object.keys(err.keyValue);
  const message = `Повтор поля(полів): ${val}. Будь ласка, введіть інше значення`;
  return new AppError(message, 400);
};

const handleDBValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Помилки заповнення даних: ${errors.join('; ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Недійсний токен. Будь ласка, увійдіть ще раз', 401);

const sendErrDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api'))
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });

  return res.status(err.statusCode).render('error', {
    title: 'Помилка',
    code: err.statusCode,
    message: err.message,
  });
};

const sendErrProd = (err, req, res) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });

  console.error('ERROR', err);
  return res.status(500).render('error', {
    title: 'Помилка',
    code: 500,
    message: 'Виникли якісь негаразди...',
  });
};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';
  error.message = err.message;
  error.name = err.name;

  if (process.env.ENV_MODE === 'development') {
    if (error.name === 'ValidationError') error = handleDBValidationError(error);
    if (error.code === 11000) error = handleDBDuplicateFields(error);
    sendErrDev(error, req, res);
  } else if (process.env.ENV_MODE === 'production') {
    if (error.name === 'CastError') error = handleDBError(error);
    if (error.code === 11000) error = handleDBDuplicateFields(error);
    if (error.name === 'ValidationError') error = handleDBValidationError(error);
    if (error.name === 'JsonWebToken' || error.name === 'TokenExpiredError')
      error = handleJWTError();

    sendErrProd(error, req, res);
  } else {
    next();
  }
};
