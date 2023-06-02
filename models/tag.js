const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Tag', tagSchema);