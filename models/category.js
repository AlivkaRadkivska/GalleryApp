const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

categorySchema.virtual('pictures', {
    ref: 'Picture',
    localField: '_id',
    foreignField: 'category_id'
});

module.exports = mongoose.model('Category', categorySchema)