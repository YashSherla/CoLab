const mongoose = require('mongoose');
const userInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avatar:{
        type:String,
        default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=1380&t=st=1728277785~exp=1728278385~hmac=cd69347b4cb84e600bcaf71dfb34e00eb404aaf15728c9f21e22041b46a7560a"
    },
    skills:{
        type:[String],
        required:true
    },
    role:{
        type:String,
        enum:['Admin', 'Manager', 'Contributor'], 
        required:true,
    },
    experience:{
        type:String,
        default:null
    },
    education: {
        degree: String,
        institution: String,
        graduatedYear: Number
    },
    aboutme:{
        type:String
    }
})
const UserInfoModel = mongoose.model('UserInfo', userInfoSchema);
module.exports = {
    UserInfoModel
}