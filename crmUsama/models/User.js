const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    isvendor: {
        type: Boolean,
        default: false,
        required: false
    },
    isadmin: {
        type: Boolean,
        default: false,
        required: false
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailpass: {
        type: String,
        required: false,
    },
    phoneno: {
        type: String,
        required: false,
       
    },
    password: {
        type: String,
        required: true,
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    mailsent:{
        type:Boolean,
        default: false,
        require: false
    }

})




module.exports = User = mongoose.model('user', UserSchema);
