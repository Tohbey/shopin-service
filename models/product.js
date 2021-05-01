const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId

const assetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["img"],
    default: "img"
  },
  URL: {
    type: String,
    required: true
  },
  default: {
    type: Boolean,
    default: false,
    required: true
  }
});

const productSchema = new mongoose.Schema(
  {
    admin:{
      type: objectId,
      ref: "User",
      required: true
    },
    brand:{
      type: objectId,
      ref: "Brand",
      required: true
    },
    name:{
      type: String,
      required: true,
      maxlength: 100
    },
    description:{
      type: String,
      required: true,
      maxlength: 200
    },
    sizes: [{
      type: String,
      required: true,
      maxlength: 50,
    }],
    sizeString: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["available", "out-of-sales"],
      default: "available",
    },
    quantity: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ["new", "good", "fair"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: objectId,
      ref: "User",
      default: null,
    },
    assets: [assetSchema],
  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
