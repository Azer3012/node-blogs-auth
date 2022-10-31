import express from "express";
import User from "../models/user.js";
import PasswordResetModel from "../models/passwordResets.js";
import multer from "multer";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("invalide mimetype"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, fileFilter });

router.post("/register", upload.single("image"), async (req, res) => {
  const { path } = req.file;
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    image: path,
  });
  await newUser.save();
  res.status(200).send("ok");
});

const SALT = "aue";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

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
});

router.patch('/password',async(req,res)=>{
    const {newPassword,resetToken}=req.body
    const passwordReset=await PasswordResetModel.findOne({resetToken,expired:false})

    const hashedPassword = crypto
    .pbkdf2Sync(newPassword, SALT, 100000, 64, "sha512")
    .toString("hex");

    if(passwordReset){
        //todo if it is expired
        const userId=passwordReset.user
        await User.findByIdAndUpdate(userId,{password:hashedPassword})
        await PasswordResetModel.findByIdAndUpdate(passwordReset._id,{expired:true})
        res.send({
            message:"Your password has been reset"
        })
    }
    else{
        res.send({
            message:"This password reset request does not exist or expired"
        })
    }
})
router.post('/password/reset-request',async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email})

    const passwordReset=new PasswordResetModel({
        user:user._id,
        resetToken:crypto.randomBytes(32).toString('base64')

    })

    //Todo send email to this user
    await passwordReset.save()
    res.send("email sent to your email")
})

export default router;
