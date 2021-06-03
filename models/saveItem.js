const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const savingItemSchema = new mongoose.Schema(
  {
    user:{
        type: objectId,
        ref: "User",
        required: true
    },
    product:{
        type: objectId,
        ref: "Product",
        required: true
    }
  },{
      timestamps: true
  }
);

const SaveItem = mongoose.model("SavingItem", savingItemSchema);

module.exports = SaveItem;