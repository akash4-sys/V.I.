const mongoose = require('mongoose');

const userschema = mongoose.Schema({

    name:String,

    email:{
        type:String,
        unique:true,
        sparse:true
    },

    username:{
        type:String,
        unique:true,
        sparse:true
    },

    password:String,

    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model('User', userschema);
module.exports = User;