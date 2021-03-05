const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const productSchema = new mongoose.Schema(
  {

  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
