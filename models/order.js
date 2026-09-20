import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
      orderId : {
        type : String,
        required : true,
        unique : true
      },
      email : {
        type : String,
        required : true
      },
      name : {
        type : String,
        required : true
      },
      phone : {
        type : String,
        required : true
      },
      address : {
        type : String,
        required : true
      },
      status : {
        type : String,
        required : true,
        default : "pending"
      },
      total : {
        type : Number,
        required : true
      },
      products : [
        {
          productId : String,
          quantity : Number
        }
      ]
});