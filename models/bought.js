const mongoose = require('mongoose');
const Picture = require('./picture');
const User = require('./user');

const boughtSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    picture_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Picture',
      required: true,
    },
    artist: {
      type: Object,
    },
    spent: {
      type: Number,
      required: true,
    },
    adding_date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

boughtSchema.virtual('picture', {
  ref: 'Picture',
  localField: 'picture_id',
  foreignField: '_id',
  justOne: true,
});

boughtSchema.index({ user_id: 1, picture_id: 1 }, { unique: true });

boughtSchema.pre('save', async function (next) {
  const picture = await Picture.findById(this.picture_id);
  this.artist = await User.findById(picture.artist_id);
  next();
});

boughtSchema.pre('find', async function (next) {
  this.populate('picture');

  next();
});

module.exports = mongoose.model('Bought', boughtSchema);
