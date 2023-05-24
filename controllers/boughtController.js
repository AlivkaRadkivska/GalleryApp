const Bought = require('../models/bought');

exports.addBought = async (req, res) => {
    try {
        const bought = new Bought({
            ...req.body
        })
        await bought.save();
        res.json(bought)
    } catch (error) {
        res.send(error.message)
    }
}

exports.getAllBought = async (req, res) => {
    try {
        const boughts = await Bought.find();
        res.json(boughts);
    } catch (error) {
        res.send(error.message)
    }
}

exports.getBought = async (req, res) => {
    try {
        const bought = await Bought.findOne({ _id: req.params.id });
        if (!bought)
            res.status(404).json(bought)
        res.status(200).send(bought)
    } catch (error) {
        res.send(error.message)
    }
}

exports.editBought = async (req, res) => {
    try {
        const bought = await Bought.findOneAndUpdate({ _id: req.params.id },
            req.body, {
            new: true,
            runValidators: true
        })
        if (!bought)
            res.status(404).json()
        res.json(bought);
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteBought = async (req, res) => {
    try {
        const bought = await Bought.findOneAndDelete({ _id: req.params.id });
        if (!bought) {
            res.status(404)
            throw new Error('Bought picture not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllBoughtByUser = async (req, res) => {
    try {
        const boughts = await Bought.deleteMany({ user_id: req.params.user.id })
        if (!boughts) {
            res.status(404)
            throw new Error('Bought pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllBoughtByPicture = async (req, res) => {
    try {
        const boughts = await Bought.deleteMany({ user_id: req.params.picture.id })
        if (!boughts) {
            res.status(404)
            throw new Error('Bought pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllBought = async (req, res) => {
    try {
        const boughts = await Bought.deleteMany()
        if (!boughts) {
            res.status(404)
            throw new Error('Bought pictures not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}