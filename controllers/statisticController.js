const Liked = require('../models/liked');
const Bought = require('../models/bought');
const Picture = require('../models/picture');

exports.getMostLikedPictures = async (req, res) => {
    res.send('most liked pictures');
}
exports.getMostBoughtPictures = async (req, res) => {
    res.send('most bought pictures')
}
exports.getMostLikedArtists = async (req, res) => {
    res.send('most liked artists')
}