function registerCommentHandlers(io, socket) {
  const createOrder = (comment) => {
    io.emit("comment:create", comment);
  };

  const updateOrder = (comment) => {
    io.emit("comment:update", comment);
  };

  const deleteOrder = (comment) => {
    io.emit("comment:delete", comment);
  };

  socket.on("comment:create", createOrder);
  socket.on("comment:update", updateOrder);
  socket.on("comment:delete", deleteOrder);
}

module.exports = registerCommentHandlers;
