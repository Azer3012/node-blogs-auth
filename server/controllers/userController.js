const { default: mongoose } = require("mongoose");
const User = require("../models/user");

const getUsers = async (req, res) => {
  const currentUserId = req.user._id;

  console.log(currentUserId);
  try {
    const users = await User.aggregate([
      {$match:{_id:{$ne:mongoose.Types.ObjectId(currentUserId)}}},
      {
        $lookup:{
          from:"messages",
          localField:"_id",
          foreignField:"fromUser",
          as:"unreadMessages"
        }
      },
      
      {
        $project:{
          _id:1,
          firstName:1,
          lastName:1,
          image:1,
          online:1,
          onAuthProvider:1,
          unreadMessages:{
            $filter:{
              input:"$unreadMessages",
              as:"message",
              cond:{
                $and:[
                  {$eq:["$$message.read",false]},
                  {$eq:["$$message.toUser",mongoose.Types.ObjectId(currentUserId)]}

                ]
              }
            }
          }
        }
      },
      {
        $project:{
          _id:1,
          firstName:1,
          lastName:1,
          image:1,
          online:1,
          onAuthProvider:1,

          unreadMessages:{
            $size:"$unreadMessages"
          }
        }
      }
    ]).exec();
    const total = await User.count({ _id: { $ne: currentUserId } });

    res.send({
      users,
      total,
    });
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

module.exports = {
  getUsers,
};
