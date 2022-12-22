const cookie = require("cookie");

const jwt = require("jsonwebtoken");
const Message = require("./models/messages");
const User = require("./models/user");


const roomMap={}

module.exports = (httpserver) => {
  const { Server } = require("socket.io");
  const io = new Server(httpserver, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  //bu routa qosulanda connect olacaq sockete
  io.of("/chat").on("connection", async (socket) => {
    console.log("a user connected");

    //qusulan userin id-sini goturmek ucun

    const cookiesString = socket?.handshake?.headers?.cookie;
    const cookies = cookie.parse(cookiesString);
    const accessToken = cookies["app-access-token"];
    const userInfo = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(userInfo);
    //Todo check if expired

    //user chat sehifesine qosulmasi
    socket.join(socket.id);

    roomMap[userInfo._id]=socket.id
    await User.findByIdAndUpdate(userInfo._id, { online: true });

    //qosulan diger userlere gonderir qosulan useri
    socket.broadcast.emit("user online", userInfo._id);


    //room-a qosulmaq ucun
    socket.on("join room", (userId) => {
        const roomName=roomMap[userId]
      socket.join(roomName);
      socket.broadcast.emit("new user", userId);
      console.log("joined" + userId);
    });

    //user chat sehifesinden cixanda ofline edig diger userlere offline oldugunu gonderir
    socket.on("disconnecting", async () => {
      socket.broadcast.emit("user offline", userInfo._id);
      await User.findByIdAndUpdate(userInfo._id, { online: false });
    });


    //mesaj gondermek
    socket.on('send message',async(data)=>{
        const {userId,content}=data;
        const message=new Message({
            fromUser:userInfo._id,
            toUser:userId,
            content
        })
        await message.save()
        const formattedMessage={
            _id:message._id,
            content:message.content,
            createdAt:message.createdAt,
            fromMySelf:false
        }
        const roomName=roomMap[userId]

        socket.to(roomName).emit('new message',formattedMessage)
    })
  });
};
