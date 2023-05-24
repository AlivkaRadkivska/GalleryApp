const mongoose = require("mongoose")

const likedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    picture_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Picture",
        required: true
    }
})

const Liked = mongoose.model("Liked", likedSchema)

module.exports = Liked