const User = require('./../models/user');
const catchAsync = require('./../utils/catchAsync')

//CHANGE
exports.loginUser = catchAsync(async (req, res, next) => {
    const user = await User.findOneByCredentials(
        req.body.email,
        req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
})
//

//CHANGE
exports.logoutUser = catchAsync(async (req, res, next) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send();
})
//

exports.addUser = catchAsync(async (req, res, next) => {
    const item = await User.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            item
        }
    })
})

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const items = await User.find().populate('bought').populate('liked').populate('pictures');

    res.status(200).json({
        status: "success",
        number: items.length,
        data: {
            items
        }
    });
})

exports.getUser = catchAsync(async (req, res, next) => {
    const item = await User.findById(req.params.id).populate('bought').populate('liked').populate('pictures');

    res.status(200).json({
        status: "success",
        data: {
            item
        }
    });
})

exports.editUser = catchAsync(async (req, res, next) => {
    const item = await User.findOneAndUpdate({ _id: req.params.id },
        req.body,
        {
            new: true,
            runValidators: true
        })

    res.status(200).json({
        status: "success",
        data: {
            item
        }
    });
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findOneAndDelete({ _id: req.params.id });

    res.status(204).json({
        status: "success"
    });
})

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
    await User.deleteMany()

    res.status(204).json({
        status: "success"
    });
})