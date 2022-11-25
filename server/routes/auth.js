const express = require("express");

const multer = require("multer");

const {
  getUserInfo,
  login,
  logout,
  passwordResetRequest,
  register,
  resetPassword,
  editProfile,
  changePhoto,
} = require("../controllers/authController.js");
const { authMiddleware } = require("./middleware/authMiddleware.js");
const passport = require("passport");

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
router.post("/register", upload.single("image"), register);

//login
router.post("/login", login);

//user info
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  getUserInfo
);

//password reset
router.patch("/password", resetPassword);

//password reset request with email
router.post("/password/reset-request", passwordResetRequest);

//logout

router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout
);

//edit profile info
router.post('/edit',editProfile)

//change photo
router.post('/changePhoto',upload.single("image"),changePhoto)

//login with google

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.CLIENT_URL + '/auth/login',
    session: false,
  }),
  (req, res) => {
    const accessToken = req.user.generateJWT();
    res.cookie('app-access-token', accessToken, {
      maxAge: 60 * 60 * 12 * 1000,
      httpOnly: true,
    });
    res.redirect(process.env.CLIENT_URL + '/dashboard');
  }
);


module.exports = router;
