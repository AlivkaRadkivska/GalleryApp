const User = require('./../models/user');

// to populate: bought, liked

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOneByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.send(error.message);
    }
}

exports.logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
}

// exports.getCurrUser = async (req, res) => {
//     const user = await User.findById(req.user.id);
//     // await user.populate('tasks');
//     res.send(user);
// }

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.send(error.message);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        // const users = await User.find().populate('tasks');
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.send(error.message);
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // await user.populate('tasks');
        res.json(user);
    } catch (error) {
        res.send(error.message);
    }
}

exports.editUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const fields = ['firstName', 'lastName', 'password', 'age', 'email'];
        fields.forEach((field) => {
            if (req.body[field]) {
                user[field] = req.body[field];
            }
        });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.send(error.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).json(user);
        res.status(204).json(user);
    } catch (error) {
        res.send(error.message);
    }
}

exports.deleteAllUsers = async (req, res) => {
    try {
        const users = await User.deleteMany({});
        if (!users) res.status(404).json();
        res.status(204).json();
    } catch (error) {
        res.send(error.message);
    }
}