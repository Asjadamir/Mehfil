export const SocketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id);

        socket.on("disconnect", (socekt) => {
            console.log("User disconnected:", socket.id);
        });
    });
};
