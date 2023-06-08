const mongoose = require('mongoose');
const Picture = require('./picture');

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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

boughtSchema.index({ user_id: 1, picture: 1 }, { unique: true });

boughtSchema.pre('save', async function (next) {
  this.picture = await Picture.findById(this.picture).select('-__v -status');
  next();
});

module.exports = mongoose.model('Bought', boughtSchema);
