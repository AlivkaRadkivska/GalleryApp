const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 7,
    validate(value) {
      if (value == "password") {
        throw new Error("'password' cannot be your password");
      }
    },
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  surname: {
    type: String,
    trim: true,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
    validate(value) {
      if (value > Date.now()) {
        throw new Error("Enter valid birth date");
      }
    },
  },
  role: { //[admin, artist, user, guest]
    // type: Enumerate,
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
},
  {
    toJSON: { virtuals: true }, toObject: { virtuals: true }
  });

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findOneByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "sgdfyuoujkhkj");
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

userSchema.virtual('liked_pictures', {
  ref: 'Liked',
  localField: '_id',
  foreignField: 'user_id'
})

userSchema.virtual('bought_pictures', {
  ref: 'Bought',
  localField: '_id',
  foreignField: 'user_id'
})

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
