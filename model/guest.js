const mongoose = require('mongoose') 
const Schema   = mongoose.Schema 

const GuestSchema = new Schema({
    firstName : String, 
    lastName : String,
    tableNumber : String,
    extraGuest : String,
    hasEntered : {type : Boolean, default : false}
})

module.exports = mongoose.model('Guest' , GuestSchema)