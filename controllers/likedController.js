const Liked = require('../models/liked');

exports.addLiked = async (req, res) => {
    try {
        const liked = new Liked({
            ...req.body
        })
        await liked.save();
        res.json(liked)
    } catch (error) {
        res.send(error.message)
    }
}

exports.getAllLiked = async (req, res) => {
    try {
        const likeds = await Liked.find();
        res.json(likeds);
    } catch (error) {
        res.send(error.message)
    }
}

exports.getLiked = async (req, res) => {
    try {
        const liked = await Liked.findOne({ _id: req.params.id });
        if (!liked)
            res.status(404).json(liked)
        res.status(200).send(liked)
    } catch (error) {
        res.send(error.message)
    }
}

exports.editLiked = async (req, res) => {
    try {
        const liked = await Liked.findOneAndUpdate({ _id: req.params.id },
            req.body, {
            new: true,
            runValidators: true
        })
        if (!liked)
            res.status(404).json()
        res.json(liked);
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteLiked = async (req, res) => {
    try {
        const liked = await Liked.findOneAndDelete({ _id: req.params.id });
        if (!liked) {
            res.status(404)
            throw new Error('Liked picture not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllLikedByUser = async (req, res) => {
    try {
        const likeds = await Liked.deleteMany({ user_id: req.params.user.id })
        if (!likeds) {
            res.status(404)
            throw new Error('Liked pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllLikedByPicture = async (req, res) => {
    try {
        const likeds = await Liked.deleteMany({ user_id: req.params.picture.id })
        if (!likeds) {
            res.status(404)
            throw new Error('Liked pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllLiked = async (req, res) => {
    try {
        const likeds = await Liked.deleteMany()
        if (!likeds) {
            res.status(404)
            throw new Error('Liked pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}