const Picture = require('./../models/picture');

exports.addPicture = async (req, res) => {
    try {
        const picture = new Picture({
            ...req.body
        })
        await picture.save();
        res.json(picture)
    } catch (error) {
        res.send(error.message)
    }
}

// needs tags extension
exports.getAllPictures = async (req, res) => {
    try {
        const pictures = await Picture.find();
        res.json(pictures);
    } catch (error) {
        res.send(error.message)
    }
}

exports.getPicture = async (req, res) => {
    try {
        const picture = await Picture.findOne({ _id: req.params.id });
        if (!picture)
            res.status(404).json(picture)
        res.send(picture)
    } catch (error) {
        res.send(error.message)
    }
}

exports.editPicture = async (req, res) => {
    try {
        const picture = await Picture.findOneAndUpdate({ _id: req.params.id, artist: req.user._id },
            req.body, {
            new: true,
            runValidators: true
        })
        if (!picture)
            res.status(404).json()
        res.json(picture);
    } catch (error) {
        res.send(error.message)
    }
}

exports.deletePicture = async (req, res) => {
    try {
        const picture = await Picture.findOneAndDelete({ _id: req.params.id, artist: req.user._id });
        if (!picture) {
            res.status(404)
            throw new Error('picture not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllPictures = async (req, res) => {
    try {
        const pictures = await Picture.deleteMany()
        if (!pictures) {
            res.status(404)
            throw new Error('pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.getPicturesByArtist = async (req, res) => {
    try {
        const picture = await Picture.findOne({ artist: req.params.id });
        if (!picture)
            res.status(404).json(picture)
        res.send(picture)
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllPicturesByArtist = async (req, res) => {
    try {
        const pictures = await Picture.find({ artist: req.params.id });
        if (!pictures) {
            res.status(404)
            throw new Error('Pictures not found')
        }
        res.status(204).json()
        res.send(pictures)
    } catch (error) {
        res.send(error.message)
    }
}

// needs tags extension
exports.getPicturesByCategory = async (req, res) => {
    try {
        const picture = await Picture.findOne({ category: req.params.id });
        if (!picture)
            res.status(404).json(picture)
        res.send(picture)
    } catch (error) {
        res.send(error.message)
    }
}