const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

let url = process.env.MONGO_URL;
mongoose.connect(url)
    .then(() => console.log('DB is connected'));

const app = express();

app.use(express.json());
app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).render('base')
});

//Routers
const pictureRouter = require('./routes/pictureRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const tagRouter = require('./routes/tagRoutes');
const likedRouter = require('./routes/likedRoutes');
const boughtRouter = require('./routes/boughtRoutes');
const statisticRouter = require('./routes/statisticRoutes');

app.use('/pictures', pictureRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/tags', tagRouter);
app.use('/liked', likedRouter);
app.use('/bought', boughtRouter);
app.use('/statistic', statisticRouter);


module.exports = app
