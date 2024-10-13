const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const projectRouter = require('./router/projectRouter');
const taskRouter = require('./router/taskRouter');
const WebSocketServer = require('ws');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)
module.exports = app;


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000/?');
    })
}

// app.listen(3000,()=>{
//     console.log('Server started on http://localhost:3000/?');
// })
