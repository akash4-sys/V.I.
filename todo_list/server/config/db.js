const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reactapp',{
                    useNewUrlParser:true, 
                    useUnifiedTopology:true
                }).then(() =>{

                    console.log("Connection Successful");

                }).catch(() =>{
                    console.log("DataBase Connection Failed");
                })