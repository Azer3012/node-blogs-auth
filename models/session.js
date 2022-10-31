import mongoose from "mongoose";

const SessionSchema = mongoose.Schema({
  user: {
    type: "ObjectId",
    ref: "users",
  },
  accessToken: String,
  expiresAt: Date,
  createdAt: {
    type:Date,
    default:Date.now
  },
});

const SessionsModel = mongoose.model("sessions", SessionSchema);

export default SessionsModel;
