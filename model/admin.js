const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const AdminSchema = new Schema({
    firstName : String, 
    lastName : String,
    email : String,
    password : String,
    number : Number,
    gender : String
})

module.exports = mongoose.model('Admin' , AdminSchema)