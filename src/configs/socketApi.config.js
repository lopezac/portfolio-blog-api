const io = require("socket.io")();
const socketApi = { io };

const registerCommentHandlers = require("../utils/commentHandler");
const registerPostHandlers = require("../utils/postHandler");

const onConnection = (socket) => {
  registerCommentHandlers(io, socket);
  registerPostHandlers(io, socket);
};

io.on("connection", onConnection);

module.exports = socketApi;
