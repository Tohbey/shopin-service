const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const ratingSchema = new mongoose.Schema(
  {
    user:{
        type: objectId,
        ref:"User",
        required: true
    },
    product:{
        type: objectId,
        ref: "Product",
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        default: 0,
        max:10
    },
    comment:{
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;