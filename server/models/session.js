import mongoose from "mongoose";

const SessionSchema = mongoose.Schema({
  user: {
    type: "ObjectId",
    ref: "users",
  },
  accessToken: String,
  expiresAt: Date,
  
},
{
  timestamps: true,
}
);

const SessionsModel = mongoose.model("sessions", SessionSchema);

export default SessionsModel;
