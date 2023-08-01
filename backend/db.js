const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://kalyani:kalyani123@cluster0.aq1sl5w.mongodb.net/"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
       console.log("Connected to Mongo successfully");
    })
}

module.exports = connectToMongo;