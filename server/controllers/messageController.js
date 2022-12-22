const Message = require("../models/messages");
const mongoose = require("mongoose");

const getUserMessages = async (req, res) => {
  console.log("geldi");

  const currentUser = req.user._id;
  const otherUser = req.params.userId;

  try {
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { fromUser: mongoose.Types.ObjectId(currentUser) },
                { toUser: mongoose.Types.ObjectId(otherUser) },
              ],
            },
            {
              $and: [
                { fromUser: mongoose.Types.ObjectId(otherUser) },
                { toUser: mongoose.Types.ObjectId(currentUser) },
              ],
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          fromUser: 1,
          toUser: 1,
          createdAt: 1,
          fromMySelf: {
            $cond: {
              if: { $eq: [mongoose.Types.ObjectId(currentUser), "$fromUser"] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $sort:{createdAt:1}
      }
    ]).exec();
    res.status(200).send(messages);
  } catch (error) {
    res.send({
      message: error,
    });
  }
};

const readMessage=async(req,res)=>{

    const fromUser=req.params.userId
    try {
        await Message.updateMany({fromUser,read:false},{read:true})
        res.status(200).send()
    } catch (error) {
        res.send({
            message:error
        })
    }
}
module.exports = {
  getUserMessages,
  readMessage
};
