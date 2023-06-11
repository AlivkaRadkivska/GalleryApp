const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: [true, 'Назва має бути унікальна'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual('number_of_pictures', {
  ref: 'Picture',
  localField: '_id',
  foreignField: 'category_id',
  count: true,
});

module.exports = mongoose.model('Category', categorySchema);
