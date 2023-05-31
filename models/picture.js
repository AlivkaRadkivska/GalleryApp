const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
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
            values: ['square', 'horizontal', 'vertical'],
            message: 'Format has to be either: square, horizontal, vertical'
        }
    },
    demo_img: {
        type: String,
        required: true,
        trim: true
    },
    full_img: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (val) {
                return val > 0;
            },
            message: 'Price cannot be below 1'
        }
    },
    status: {
        type: String,
        default: 'checking',
        enum: {
            values: ['checking', 'active', 'hidden', 'rejected'],
            message: 'Status has to be either: checking, active, hidden, rejected'
        }
    },
    artist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    adding_date: {
        type: Date,
        default: Date.now()
    },
    tags: [
        {
            tag: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

pictureSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: '_id',
    justOne: true
});

pictureSchema.virtual('artist', {
    ref: 'User',
    localField: 'artist_id',
    foreignField: '_id',
    justOne: true
})

pictureSchema.pre(/^find/, function (next) {
    this.find({ status: 'active' })

    next();
})

module.exports = mongoose.model("Picture", pictureSchema)