const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
const expiry = process.env.expireIn

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      required: true,
      minlength: 5,
      maxlength: 50,
      lowercase: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: false,
      index: true,
    },
    name: {
      type:String,
      maxlength: 30,
      required:true
    },
    phoneNumber: {
      type: String,
      maxlength: 225,
      index: true,
      required: true,
    },
    phoneNumberVerified: {
      type: Boolean,
      default: false,
      required: false,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended","inactive"],
      default: "inactive",
      required:true
    },
    password:{
      type:String,
      required:true,
      maxlength:600,
    },
    role:{
      type: String,
      enum:["User","Admin"],
      default:"User",
      required:true
    },
    img: {
      type: String,
    },
    rememberToken: {
      token: {
        type: String,
        default: null,
      },
      expiredDate: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id:this._id,
    email:this.email,
    role:this.role
  }, 
  jwtSecret,
  {expiresIn: expiry})

  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
