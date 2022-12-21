const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    fromUser:{
        type:'ObjectId',
        ref:'users'
    },
    toUser:{
        type:'ObjectId',
        ref:'users'
    },
    content:String,
    read:{
      type:Boolean,
      default:()=>false
    }
  },
  {
    timestamps:true
  }
  
);

const MessageModel = mongoose.model("messages", MessageSchema);
module.exports = MessageModel;
