const mongoose = require('mongoose')

const likedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Picture',
        required: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

likedSchema.index({ user_id: 1, picture_id: 1 }, { unique: true });

likedSchema.virtual('picture', {
    ref: 'Picture',
    localField: 'picture_id',
    foreignField: '_id',
    justOne: true
});

likedSchema.pre(/^find/, function (next) {
    this.populate('picture');
    next();
});

module.exports = mongoose.model('Liked', likedSchema);