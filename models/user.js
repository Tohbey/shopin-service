const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    name: {
      type:String,
      required:true
    },
    phoneNumber: String,
    status: {
      type: String,
      enum: ["active", "suspended","pending"],
      default: "pending",
      required:true
    },
    password:{
      type:String,
      required:true,
      maxlength:600,
    },
    newUser:{
      type:Boolean,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id:this._id,email:this.email
  }, jwtSecret)

  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
