const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
})

//CHANGE
// categorySchema.virtual('in_use').get(function () {
//     let pictureCount = 0;

//     if (this.pictures)
//         pictureCount = this.pictures.length;

//     return pictureCount > 0;
// })
//

module.exports = mongoose.model("Tag", tagSchema)