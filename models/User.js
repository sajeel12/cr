const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    isadmin: {
        type:Boolean,
        default: false,
        required:false
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
   
    phoneno: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now
    }

})




module.exports = User = mongoose.model('user', UserSchema);
