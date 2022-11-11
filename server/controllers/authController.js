import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import PasswordResetModel from "../models/passwordResets.js";
import nodemailer from "nodemailer";

import cloudinary from "cloudinary";

const SALT = "aue";





//reguster
const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;



cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

  
  console.log(req.file);

  if (firstName && lastName && email && password ) {
    try {
      const existingEmail = await User.find({ email });

      console.log(existingEmail);


      if (existingEmail) {
        res.status(400).send({
          message: "User with this email already exist!",
        });
      } 
      const result = await cloudinary.v2.uploader.upload(req.file.path);


      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        image: result.secure_url,
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
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const hashedPassword = crypto
        .pbkdf2Sync(password, SALT, 100000, 64, "sha512")
        .toString("hex");

      const user = await User.findOne({ email, password: hashedPassword });

      if (user) {
        const { password: _, ...rest } = user.toObject();
        const accessToken = jwt.sign(
          {
            data: rest,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          },
          process.env.JWT_SECRET_KEY
        );
        res.send({ accessToken });
      } else {
        res.status(401).send({
          message: "Email or password is not correct",
        });
      }
    } catch (error) {
      next(error);
    }
  }
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

      if(!user){
        res.status(400).send({
            message:"No user found with this email"
        })
      }

      const resetToken=crypto.randomBytes(32).toString("base64")
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

      const linkToPasswordResetPage="http://localhost:3000/password-mail"+resetToken;
      await transporter.sendMail(
        {
            from:"Blogs Api <noreply@blogs.info>",
            to:email,
            subject:"Password Reset",
            text:'',
            html:`
            <h1>Reset Pasword</h1>
            <p>

                <a href="${linkToPasswordResetPage}" target="_blank">Reset Password</a>
            
            </p>

            `

        }
      )
      res.send("email sent to your email");
    } catch (error) {
      next(error);
    }
  }
};

export { register, login, resetPassword, passwordResetRequest };
