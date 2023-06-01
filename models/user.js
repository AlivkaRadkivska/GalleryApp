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
        validate: [validator.isEmail, 'Email is not valid']
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        validate: {
            validator: function (val) {
                return val != 'password';
            },
            message: '"password" can\'t be your password'
        },
        // select: false
    },
    password_confirm: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        validate: {
            validator: function (val) { //only for save/create
                return val === this.password;
            },
            message: 'Passwords should be the same'
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

userSchema.virtual('liked', {
    ref: 'Liked',
    localField: '_id',
    foreignField: 'user_id'
})

userSchema.virtual('bought', {
    ref: 'Bought',
    localField: '_id',
    foreignField: 'user_id'
})

userSchema.virtual('pictures', {
    ref: 'Picture',
    localField: '_id',
    foreignField: 'artist_id'
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 9);
    this.password_confirm = undefined;

    next();
});

userSchema.pre(/^delete/, async function (next) {
    console.log(this._id)
    await this.model('Liked').deleteMany({ user_id: this._id });
    await this.model('Bought').deleteMany({ user_id: this._id });

    next();
})

userSchema.methods.checkPassword = async function (candidate, password) {
    return await bcrypt.compare(candidate, password);
};

userSchema.methods.changedPassword = function (JWTTimestamp) {
    if (this.password_changed_at) {
        const changedTimestamp = parseInt(this.password_changed_at.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

module.exports = mongoose.model('User', userSchema);