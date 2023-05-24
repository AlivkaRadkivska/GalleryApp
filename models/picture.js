const mongoose = require("mongoose")

const pictureSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    format: { // [squad, horizontal, vertical]
        // type: Enumerate,
        type: String,
        trim: true,
        required: true
    },
    demo_img: {
        type: String,
        trim: true,
        required: true
    },
    full_img: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error("price cannot be below 1");
            }
        },
    },
    status: { //enumeration [checking, active, hidden]
        // type: Enumerate,
        type: String,
        default: 'checking'
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        // type: Number,
        ref: "User",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        // type: Number,
        ref: "Category",
        required: true
    },
    tags: [
        {
            tag: {
                type: String,
                required: true,
            },
        },
    ],
})


const Picture = mongoose.model("Picture", pictureSchema)

module.exports = Picture