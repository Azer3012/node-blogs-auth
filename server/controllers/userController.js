const User = require("../models/user");



const getUsers = async (req, res) => {
    const currentUserId=req.user._id;

    console.log(currentUserId);
  try {
   const users=await User.find({_id:{$ne:currentUserId}})
   const total=await User.count({_id:{$ne:currentUserId}})

   res.send({
    users,
    total
   })
  } catch (error) {
    res.send({
        message:error
    })
  }
};

module.exports= {
  getUsers
};