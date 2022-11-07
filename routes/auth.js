import express from "express";

import multer from "multer";

import { login, passwordResetRequest, register, resetPassword } from "../controllers/authController.js";

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


//register
router.post("/register", upload.single("image"),register);

//login
router.post("/login",login );

//password reset
router.patch('/password',resetPassword)

//password reset request with email
router.post('/password/reset-request',passwordResetRequest)

export default router;
