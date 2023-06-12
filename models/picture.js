const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    format: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ['квадратний', 'горизонтальний', 'вертикальний'],
        message: 'Оберіть один з варіантів: квадратний, горизонтальний, вертикальний',
      },
    },
    demo: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return val > 0;
        },
        message: "Ціна не може бути від'ємною",
      },
    },
    status: {
      type: String,
      default: 'checking',
      enum: {
        values: ['checking', 'active', 'rejected', 'hidden'],
        message: 'Оберіть один з варіантів: checking, active, rejected, hidden',
      },
    },
    artist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    adding_date: {
      type: Date,
      default: Date.now(),
    },
    tag_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
      },
    ],
    message: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pictureSchema.virtual('category', {
  ref: 'Category',
  localField: 'category_id',
  foreignField: '_id',
  justOne: true,
});

pictureSchema.virtual('artist', {
  ref: 'User',
  localField: 'artist_id',
  foreignField: '_id',
  justOne: true,
});

pictureSchema.virtual('tags', {
  ref: 'Tag',
  localField: 'tag_ids',
  foreignField: '_id',
});

pictureSchema.virtual('buying_count', {
  ref: 'Bought',
  localField: '_id',
  foreignField: 'picture_id',
  count: true,
});

pictureSchema.pre(/^find/, function (next) {
  this.find().populate('category').populate('artist').populate('tags');
  next();
});

module.exports = mongoose.model('Picture', pictureSchema);
