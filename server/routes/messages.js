const express =require("express") 
const passport=require('passport');
const { getUserMessages, readMessage } = require("../controllers/messageController");



const router = express.Router();

router.use(passport.authenticate("jwt",{session:false}))

router.get('/messages/:userId',getUserMessages)
router.put('/messages/:userId/read',readMessage)

module.exports= router;