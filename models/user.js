const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Liked = require('./liked');
const Bought = require('./bought');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Електрона пошта не пройшла валідацію']
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        select: false
    },
    password_confirm: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Пароль має бути однаковим'
        }
    },
    password_changed_at: Date,
    name: {
        type: String,
        trim: true,
        required: true,
    },
    avatar: {
        type: String,
        default: 'default.png'
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'artist', 'user']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual('pictures', {
    ref: 'Picture',
    localField: '_id',
    foreignField: 'artist_id'
});

userSchema.virtual('liked', {
    ref: 'Liked',
    localField: '_id',
    foreignField: 'user_id'
});

userSchema.virtual('bought', {
    ref: 'Bought',
    localField: '_id',
    foreignField: 'user_id'
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 9);
    this.password_confirm = undefined;

    next();
});

userSchema.pre(/^findOne/, function (next) {
    this.populate('bought').populate('liked');
    if (this.role === 'artist')
        this.populate('pictures');

    next();
});

userSchema.methods.checkPassword = async function (candidate, password) {
    return await bcrypt.compare(candidate, password);
};

module.exports = mongoose.model('User', userSchema);