const mongoose =require("mongoose") ;
const crypto =require("crypto");
const  jwt  = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type:String,
      unique:true
    },
    password: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmuz6ggje/image/upload/v1668182918/follower_olykor.png",
    },
    oAuthProvider:String,
    oAuthId:String
  },

  {
    timestamps: true,
  }
);

const SALT = "aue";

UserSchema.methods.generateJWT=function(){
  const user=this.toJSON()
  const accessToken=jwt.sign(user,process.env.JWT_SECRET_KEY,{
    expiresIn:'12h'
  })
  return accessToken;
}

UserSchema.pre("save", function (next) {
  if(this.oAuthId){
    return next()
  }
  this.password = crypto
    .pbkdf2Sync(this.password, SALT, 100000, 64, "sha512")
    .toString("hex");

  next();
});

const UserModel = mongoose.model("users", UserSchema);

module.exports= UserModel;
