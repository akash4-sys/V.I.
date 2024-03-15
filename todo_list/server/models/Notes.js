const mongoose = require('mongoose');

const noteschema = mongoose.Schema({

    title:String,
    description:String,

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tag:{
        type:String,
        default:'General'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

const Notes = mongoose.model("notes", noteschema);

module.exports = Notes;