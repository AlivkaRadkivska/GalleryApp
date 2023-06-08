const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tagSchema.virtual('number_of_pictures', {
  ref: 'Picture',
  localField: '_id',
  foreignField: 'tag_ids',
  count: true,
});

module.exports = mongoose.model('Tag', tagSchema);
