const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const brandSchema = new mongoose.Schema(
  {

  },
  {
    timestamps: true,
  }
);


const Brand = mongoose.model("Product", brandSchema);

module.exports = Brand;
