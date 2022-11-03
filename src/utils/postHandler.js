function registerPostHandlers(io, socket) {
  const createOrder = (post) => {
    io.emit("post:create", post);
  };

  const publishOrder = (post) => {
    io.emit("post:publish", post);
  };

  const unpublishOrder = (post) => {
    io.emit("post:unpublish", post);
  };

  const updateOrder = (post) => {
    io.emit("post:update", post);
  };

  const deleteOrder = (post) => {
    io.emit("post:delete", post);
  };

  socket.on("post:create", createOrder);
  socket.on("post:update", updateOrder);
  socket.on("post:delete", deleteOrder);
  socket.on("post:publish", publishOrder);
  socket.on("post:unpublish", unpublishOrder);
}

module.exports = registerPostHandlers;
