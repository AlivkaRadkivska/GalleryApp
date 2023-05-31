const mongoose = require("mongoose")

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
})

categorySchema.virtual('pictures', {
    ref: 'Picture',
    localField: '_id',
    foreignField: 'category_id'
})

categorySchema.virtual('in_use').get(function () {
    let pictureCount = 0;

    if (this.pictures)
        pictureCount = this.pictures.length;

    return pictureCount > 0;
})

//CHANGE
// categorySchema.pre(/delete/, function (next) {
//     console.log(this.name)
//     // if (this.in_use)
//     next();
// });
//

module.exports = mongoose.model("Category", categorySchema)