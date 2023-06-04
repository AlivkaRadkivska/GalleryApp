const path = require('path');
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

const app = express();
app.use(express.json());

//clean data from mongo expressions lake $gte/$gt etc//
app.use(mongoSanitize());

//clean dublicated params//
app.use(hpp({
    whitelist: ['format', 'artist_id', 'category_id']
}));

app.set('view engine', 'pug');

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
const viewsRouter = require('./routes/viewsRoutes');


//?Routes
app.use('/api/pictures', pictureRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tags', tagRouter);
app.use('/api/liked', likedRouter);
app.use('/api/bought', boughtRouter);
app.use('/', viewsRouter);
//?

app.all('*', (req, res, next) => {
    next(new AppError('Page not found', 404));
});

app.use(ErrorHandler);

module.exports = app