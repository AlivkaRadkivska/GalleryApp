const mongoose = require('mongoose');
const Picture = require('./picture');
const User = require('./user');
const Category = require('./category');

const boughtSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    picture: {
      type: Object,
      required: true,
    },
    artist: {
      type: Object,
    },
    category: {
      type: Object,
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

boughtSchema.index({ user_id: 1, picture: 1 }, { unique: true });

boughtSchema.pre('save', async function (next) {
  this.picture = await Picture.findById(this.picture);
  this.artist = await User.findById(this.picture.artist_id);
  this.category = await Category.findById(this.picture.category_id);

  console.log(this.picture);
  next();
});

module.exports = mongoose.model('Bought', boughtSchema);
