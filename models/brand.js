const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const brandSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required: true
    },
    img:{
      type:String
    },
    createdBy:{
      type:objectId,
      required: true,
      ref: "User"
    },
    description:{
      type:String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);


const Brand = mongoose.model("Product", brandSchema);

module.exports = Brand;
