const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const projectRouter = require('./router/projectRouter');
const taskRouter = require('./router/taskRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE"],

    }
});
app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors());
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)
app.use(cookieParser())


app.get('/yash', (req, res) => {
    const filePath = path.join(__dirname, '../dummy/index.html');
    res.sendFile(filePath);
});
io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('message', (msg) => {
        io.emit('message', msg)
        console.log("Chat Message: " + msg);
    })
    socket.on('taskCreated', (task) => {
        console.log('Task CreatedBoardCast: ' + task);
    })
    socket.on('taskUpdated', (task) => {
        console.log('Task UpdateBoardCast: ' + task);
    })
    socket.on('taskDelete', (task) => {
        console.log('Task DeleteBoardCast: ' + task);
    })
    socket.on('disconnect', () => {
        console.log('a user disconnect');
    })
})

if (require.main === module) {
    server.listen(3000, () => {
        console.log('Server started on http://localhost:3000/?');
    })
}
module.exports = app

// app.listen(3000,()=>{
//     console.log('Server started on http://localhost:3000/?');
// })
