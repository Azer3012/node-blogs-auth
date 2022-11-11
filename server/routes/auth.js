import express from "express";

import multer from "multer";



import { getUserInfo, login, logout, passwordResetRequest, register, resetPassword } from "../controllers/authController.js";
import { authMiddleware } from "./middleware/authMiddleware.js";


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

//user info
router.get('/getUser',authMiddleware,getUserInfo)

//password reset
router.patch('/password',resetPassword)

//password reset request with email
router.post('/password/reset-request',passwordResetRequest)

//logout

router.post('/logout',authMiddleware,logout)




export default router;