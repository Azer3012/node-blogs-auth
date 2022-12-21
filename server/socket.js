const cookie = require("cookie");

const jwt = require("jsonwebtoken");
const User = require("./models/user");

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

    socket.join(userInfo._id);
    await User.findByIdAndUpdate(userInfo._id, { online: true });

    //qosulan dioger userlere gonderir qosulan useri
    socket.broadcast.emit("user online", userInfo._id);

    //room-a qosulmaq ucun

    socket.on("join room", (userId) => {
      socket.join(userId);
      socket.broadcast.emit("new user", userId);
      console.log("joined" + userId);
    });

    socket.on("disconnecting", async () => {
      socket.broadcast.emit("user offline", userInfo._id);
      await User.findByIdAndUpdate(userInfo._id, { online: false });
    });
  });
};
