const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const addressSchema = new mongoose.Schema({
    user:{
      type:ObjectId,
      required:true,
      ref:"User"
    },
    country:{
      type:String,
      required:true
    },
    state:{
      type:String,
      required:true
    },
    LGA:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    default:{
      type: Boolean,
      required:true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);


const Address = mongoose.model("address", addressSchema);

module.exports = Address;
