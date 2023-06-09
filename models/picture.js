const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
      minLength: 5,
    },
    format: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ['квадратний', 'горизонтальний', 'вертикальний'],
        message:
          'Оберіть один з варіантів: квадратний, горизонтальний, вертикальний',
      },
    },
    demo_img: {
      type: String,
      required: true,
      trim: true,
    },
    full_img: {
      type: String,
      required: true,
      trim: true,
      select: false,
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
        values: ['checking', 'active', 'hidden', 'rejected'],
        message: 'Оберіть один з варіантів: checking, active, hidden, rejected',
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

pictureSchema.pre(/^find/, function (next) {
  this.find()
    .populate({ path: 'category', select: '-__v' })
    .populate({
      path: 'artist',
      select: '-__v -role -avatar',
    })
    .populate({ path: 'tags', select: '-__v' });
  next();
});

module.exports = mongoose.model('Picture', pictureSchema);
