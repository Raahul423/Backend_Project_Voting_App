const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  adhaar: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isvoted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  const User = this;
  if (!User.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(User.password,salt);
    User.password=hashpassword;
  } catch (error) {
    return next(error);
  }
});


UserSchema.methods.compared = async function(candidatepass) {
  try {
    const ismatch = await bcrypt.compare(candidatepass,this.password);
    return ismatch;
  } catch (error) {
    throw error;
  }
}

const User = mongoose.model("UserSchema", UserSchema);
module.exports = User;
