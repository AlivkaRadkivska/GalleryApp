const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'електронна пошта не пройшла валідацію'],
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [5, 'мінімальна довжина паролю має бути 5 символів'],
      select: false,
    },
    password_confirm: {
      type: String,
      trim: true,
      required: true,
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'пароль має бути однаковим',
      },
    },
    password_changed_at: Date,
    name: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      default: 'default.png',
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'artist', 'user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('pictures', {
  ref: 'Picture',
  localField: '_id',
  foreignField: 'artist_id',
});

userSchema.virtual('number_of_pictures', {
  ref: 'Picture',
  localField: '_id',
  foreignField: 'artist_id',
  count: true,
});
userSchema.virtual('bought', {
  ref: 'Bought',
  localField: '_id',
  foreignField: 'user_id',
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 9);
  this.password_confirm = undefined;

  next();
});

userSchema.pre(/^findOne/, function (next) {
  this.populate('bought');
  if (this.role == 'artist') this.populate('pictures');

  next();
});

userSchema.methods.checkPassword = async function (candidate, password) {
  return await bcrypt.compare(candidate, password);
};

module.exports = mongoose.model('User', userSchema);
