const path = require('path');
const express = require('express');

const app = express();
app.use(express.json());
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.ENV_MODE === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}


const AppError = require('./utils/appError');
const ErrorHandler = require('./controllers/errorController');
const pictureRouter = require('./routes/pictureRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const tagRouter = require('./routes/tagRoutes');
const likedRouter = require('./routes/likedRoutes');
const boughtRouter = require('./routes/boughtRoutes');

//Routes
app.use('/pictures', pictureRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/tags', tagRouter);
app.use('/liked', likedRouter);
app.use('/bought', boughtRouter);

app.all('*', (req, res, next) => {
    next(new AppError('Page not found', 404));
});

app.use(ErrorHandler);

module.exports = app