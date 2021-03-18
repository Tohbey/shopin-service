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
    admin:{
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


const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
