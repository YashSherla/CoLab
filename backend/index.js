const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

app.use('/auth',authRouter)

app.listen(3000,()=>{
    console.log('Server started on http://localhost:3000/?');
})