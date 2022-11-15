const User =require("../models/user.js") ;
const jwt =require("jsonwebtoken") ;
const crypto =require("crypto") ;
const PasswordResetModel =require("../models/passwordResets.js") ;
const nodemailer =require("nodemailer") ;
const passport =require("passport") ;
const cloudinary =require("cloudinary") ;

const SALT = "aue";

//reguster
const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (firstName && lastName && email && password) {
    try {
      console.log(email);
      // const existingEmail = await User.find({ email });

      // console.log({existingEmail});

      // if (existingEmail) {
      //   res.status(400).send({
      //     message: "User with this email already exist!",
      //   });
      // }

      let result = null;

      if (req?.file?.path) {
        result = await cloudinary.v2.uploader.upload(req.file.path);
      }

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        image: result ? result.secure_url : undefined,
      });
      await newUser.save();
      res.status(200).send("ok");
    } catch (error) {
      // next(error);
      console.log(error);
    }
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('here');
  passport.authenticate('local', { session: false }, (error, user) => {
    if (error) {
      return res.status(400).json({ error });
    }

    req.login(user, { session: false }, (error) => {
      const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
        expiresIn: '24h',
      });

      res.cookie('app-access-token', accessToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });

      res.status(200).send();
    });
  })(req, res);
};

//user info

const getUserInfo = (req, res) => {
  console.log("aloo");
  console.log(req.user);
  res.status(200).send(req.user);
};

//password reset
const resetPassword = async (req, res, next) => {
  const { newPassword, resetToken } = req.body;
  if ((newPassword, resetToken)) {
    try {
      const passwordReset = await PasswordResetModel.findOne({
        resetToken,
        expired: false,
      });

      const hashedPassword = crypto
        .pbkdf2Sync(newPassword, SALT, 100000, 64, "sha512")
        .toString("hex");

      if (passwordReset) {
        //todo if it is expired
        const userId = passwordReset.user;
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        await PasswordResetModel.findByIdAndUpdate(passwordReset._id, {
          expired: true,
        });
        res.send({
          message: "Your password has been reset",
        });
      } else {
        res.send({
          message: "This password reset request does not exist or expired",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};

///password reset request with send email
const passwordResetRequest = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).send({
          message: "No user found with this email",
        });
      }

      const resetToken = crypto.randomBytes(32).toString("base64");
      const passwordReset = new PasswordResetModel({
        user: user._id,
        resetToken,
      });

      //Todo send email to this user
      await passwordReset.save();
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const linkToPasswordResetPage =
        "http://localhost:3000/password-mail" + resetToken;
      await transporter.sendMail({
        from: "Blogs Api <noreply@blogs.info>",
        to: email,
        subject: "Password Reset",
        text: "",
        html: `
            <h1>Reset Pasword</h1>
            <p>

                <a href="${linkToPasswordResetPage}" target="_blank">Reset Password</a>
            
            </p>

            `,
      });
      res.send("email sent to your email");
    } catch (error) {
      next(error);
    }
  }
};

//logout

const logout = async (req, res) => {
  try {
    await res.clearCookie("app-access-token", { path: "/" });
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
};

module.exports= {
  register,
  login,
  resetPassword,
  passwordResetRequest,
  getUserInfo,
  logout,
};
