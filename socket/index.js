const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
let users = [];
console.log(users)
const addUser = (userId, socketId) => {
  console.log(userId, socketId)
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};


const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};


const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

  
  io.on("connection", (socket) => {
   
    io.emit("getUsers",users)
    socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

      io.emit("getUsers", users);
    });


    socket.on("sendMessage", ({ senderId, receiverId, text ,  createdAt }) => {
      const user = getUser(receiverId);
  

      if(user ){ 
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
        createdAt
      });
    }
  
  
    
    
    });
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
    });

  })