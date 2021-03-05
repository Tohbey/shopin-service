const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const basketSchema = new mongoose.Schema(
  {

  },
  {
    timestamps: true,
  }
);


const Basket = mongoose.model("Product", basketSchema);

module.exports = Basket;
