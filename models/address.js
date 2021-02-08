const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new mongoose.Schema({
    user:{
      type:ObjectId,
      required:true
    },
    address:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);


const Address = mongoose.model("address", addressSchema);

module.exports = Address;
