const passport = require("passport");

const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt");
const User = require("../models/user");
const crypto = require("crypto");

const locaStrategy = LocalStrategy.Strategy;
const jwtStrategy = JwtStrategy.Strategy;
const SALT = "aue";
passport.use(
  new locaStrategy(
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

        return done(null, false);
      } catch (error) {
        done(error);
      }
    }
  )
);
// passport.use(new jwtStrategy());
