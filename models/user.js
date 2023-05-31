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
        validate: {
            validator: function (val) {
                return validator.isEmail(val);
            },
            message: 'Email is not valid'
        }
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
        }
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        required: true,
    },
    birth_date: {
        type: Date,
        default: Date.now(),
        validate: {
            validator: function (val) {
                return val <= Date.now();
            },
            message: 'Enter valid birth date'
        }
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'artist', 'user'],
            message: 'Role has to be either: admin, artist, user'
        }
    },
    //CHANGE
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    //
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
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 9);

    next();
});

//CHANGE
userSchema.pre(/delete/, async function (next) {
    console.log(this._id);
    await Liked.deleteMany({ user_id: this._id });
    await Bought.deleteMany({ user_id: this._id });
    await Picture.deleteMany({ artist_id: this._id });

    next();
});
//

//CHANGE
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_KEY);
    this.tokens = this.tokens.concat({ token });

    await this.save();
    return token;
};
//


//CHANGE
userSchema.statics.findOneByCredentials = async function (email, password) {
    const user = await User.findOne({ email });

    if (!user)
        throw new Error('Incorrect email');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new Error('Incorrect password');

    return user;
};
//

module.exports = mongoose.model('User', userSchema);