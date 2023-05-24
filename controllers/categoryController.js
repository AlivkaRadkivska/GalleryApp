const Category = require('../models/category');

// needs a check if category in use
exports.addCategory = async (req, res) => {
    try {
        const category = new Category({
            ...req.body
        })
        await category.save();
        res.json(category)
    } catch (error) {
        res.send(error.message)
    }
}

// needs a check if category in use
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.send(error.message)
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        if (!category)
            res.status(404).json(category)
        res.send(category)
    } catch (error) {
        res.send(error.message)
    }
}

exports.editCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({ _id: req.params.id },
            req.body, {
            new: true,
            runValidators: true
        })
        if (!category)
            res.status(404).json()
        res.json(category);
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id });
        if (!category) {
            res.status(404)
            throw new Error('Category not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}

exports.deleteAllCategories = async (req, res) => {
    try {
        const categories = await Category.deleteMany()
        if (!categories) {
            res.status(404)
            throw new Error('categories not found')
        }
        res.status(204).json()
    } catch (error) {
        res.send(error.message)
    }
}