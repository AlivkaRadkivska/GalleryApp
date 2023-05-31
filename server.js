const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log('Exception!', err.name, err.message);
    console.log('Shutting down...');
    process.exit(1);
})

dotenv.config({ path: './conf.env' })
const app = require('./app')

let url = process.env.MONGO_URL;
mongoose
    .connect(url)
    .then(() => console.log('DB is connected'))

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is listening on ${port} port`);
});

process.on('unhandledRejection', err => {
    console.log('Rejection!', err.name, err.message);
    console.log('Shutting down...');
    server.close(() => {
        process.exit(1);
    });
});

