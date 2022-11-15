const mongoose =require("mongoose") ;

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

module.exports= SessionsModel;
