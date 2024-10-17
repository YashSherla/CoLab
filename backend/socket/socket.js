const { Server } = require('socket.io');
let io;
const setupSocketIO = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "DELETE"],
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);

        socket.on('taskCreated', (msg) => {
            // io.emit('message', msg);
            console.log("taskCreatedFromSocketIO:" + msg);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
const getSocketIO = () =>{
    if (!io) {
        throw new Error('Socket.io not initialized. Call initSocket first.');
    }
    return io;
}
module.exports = {setupSocketIO,getSocketIO};
