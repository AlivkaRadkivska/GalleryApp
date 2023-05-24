const Tag = require('../models/tag');

// needs a check if tag in use
exports.addTag = async (req, res) => {
    try {
        const tag = new Tag({
            ...req.body
        })
        await tag.save();
        res.json(tag)
    } catch (error) {
        res.send(error.message)
    }
}

// needs a check if tag in use
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.send(error.message)
    }
}

exports.getTag = async (req, res) => {
    try {
        const tag = await Tag.findOne({ _id: req.params.id });
        if (!tag)
            res.status(404).json(tag)
        res.status(200).send(tag)
    } catch (error) {
        res.send(error.message)
    }
}

exports.editTag = async (req, res) => {
    try {
        const tag = await Tag.findOneAndUpdate({ _id: req.params.id },
            req.body, {
            new: true,
            runValidators: true
        })
        if (!tag)
            res.status(404).json()
        res.json(tag);
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findOneAndDelete({ _id: req.params.id });
        if (!tag) {
            res.status(404)
            throw new Error('Tag not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllTags = async (req, res) => {
    try {
        const tags = await Tag.deleteMany()
        if (!tags) {
            res.status(404)
            throw new Error('Tags not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}