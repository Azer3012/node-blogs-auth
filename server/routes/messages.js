const express =require("express") 
const passport=require('passport');
const { getUserMessages } = require("../controllers/messageController");



const router = express.Router();

router.use(passport.authenticate("jwt",{session:false}))

router.get('/messages/:userId',getUserMessages)

module.exports= router;