const { Server } = require("socket.io");
let io;
const initServer = (httpServer) =>{
    io = new Server(httpServer);
}

const getServer = () =>{
    if (!io) {
        throw new Error('Socket.io not initialized. Call initSocket first.');
    }
    return io;
}
module.exports = {
    initServer,
    getServer
}