export default function registerCommentHandlers(io, socket) {
  const createOrder = () => {};

  const updateOrder = () => {};

  const deleteOrder = () => {};

  socket.on("comment:create", createOrder);
  socket.on("comment:update", updateOrder);
  socket.on("comment:delete", deleteOrder);
}
