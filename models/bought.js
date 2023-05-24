const mongoose = require("mongoose")

const boughtSchema = new mongoose.Schema({
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

const Bought = mongoose.model("Bought", boughtSchema)

module.exports = Bought