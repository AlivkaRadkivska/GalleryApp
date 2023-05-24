const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

categorySchema.virtual('pictures', {
    ref: 'Picture',
    localField: '_id',
    foreignField: 'artist'
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category