const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const projectRouter = require('./router/projectRouter');
const taskRouter = require('./router/taskRouter');
const path = require('path');
const app = express();
const http = require('http');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)

const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST","DELETE"]
    }
});

app.get('/yash', (req, res) => {
    const filePath = path.join(__dirname, '../dummy/index.html');
   res.sendFile(filePath);
});
io.on('connection',(socket)=>{
    console.log('a user connected');
    // socket.on('chat message',(msg)=>{
    //     io.emit('chat message',msg)
    //     console.log("Chat Message: "+msg);
    // })
    socket.on('disconnect',()=>{
        console.log('a user disconnect');
    })
}) 

if (require.main === module) {
    server.listen(3000, () => {
        console.log('Server started on http://localhost:3000/?');
    })
}

// app.listen(3000,()=>{
//     console.log('Server started on http://localhost:3000/?');
// })
