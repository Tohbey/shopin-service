const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const basketSchema = new mongoose.Schema(
  {
    user:{
      type: objectId,
      required: true,
      ref: "User"
    },   
    product:{
      type: objectId,
      required: true,
      ref: "Product"
    },
    quantity:{
      type: Number,
      required: true,
      min: 0
    },
    amount:{
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true,
  }
);


const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
