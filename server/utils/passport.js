const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleAuthStrateg= require('passport-google-oauth20').Strategy
const User = require("../models/user");
const crypto = require("crypto");




const SALT = "aue";
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      
      try {
        const hashedPassword = crypto
          .pbkdf2Sync(password, SALT, 100000, 64, "sha512")
          .toString("hex");

        const user = await User.findOne({
          email,
          password: hashedPassword,
        })
          .select("_id firstName lastName email image")
          .exec();

        if (user) {
          return done(null, user.toObject());
        }

        return done('username or password is incorrect', false);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(new JwtStrategy({
  jwtFromRequest:req=>req.cookies['app-access-token'],
  secretOrKey:process.env.JWT_SECRET_KEY
},
(jwtPayload,done)=>{
  if(Date.now()>jwtPayload.expires*1000){
    return done('jwt expired')
  }
  return done(null,jwtPayload)
}

));

passport.use(new GoogleAuthStrateg(
  {
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.SELF_URL+'/api/v1/google/callback'
  },
  async(accessToken,refreshToken,profile,done)=>{
      

    try {

      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const oAuthId = profile.id;
      const email = profile.emails[0].value;
      const image = profile.photos[0].value;
      

      const user = await User.findOneAndUpdate({email},{
        firstName,
        lastName,
        oAuthId,
        oAuthProvider: 'google',
        email,
        image,
      },{upsert:true});

      
      done(null, user);

    } catch (error) {
      done(error);
    }
  }
  ))
