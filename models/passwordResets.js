import mongoose from "mongoose";


const PasswordResetSchema = mongoose.Schema({
  user: {
    type: "ObjectId",
    ref: "users",
  },
  resetToken: String,
  expired: {
    type:Boolean,
    default:()=>false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PasswordResetModel = mongoose.model(
  "passwordsResets",
  PasswordResetSchema
);

export default PasswordResetModel;
