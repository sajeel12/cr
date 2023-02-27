const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

// create schema 

const LeadSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'

    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    recieveddate: {
        type: Date,
        default: Date.now
    },
    originaddress: {
        type: String,
        required: true
    },
    origincity: {
        type: String,
        required: true
    },
    originstate: {
        type: String,
        required: true
    },
    originzipcode: {
        type: String,
        required: true
    },
    destinationaddress: {
        type: String,
        required: true
    },
    destinationcity: {
        type: String,
        required: true
    },
    destinationstate: {
        type: String,
        required: true
    },
    destinationzipcode: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    vehicletype: {
        type: String,
        required: true
    },
    modelyear: {
        type: String,
        required: true
    },
    vehiclecondition: {
        type: String,
        required: false
    },
    transporttype: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    shipdate: {
        type: String,
        required: false
    },
    shipdate: {
        type: String,
        required: false
    },
    isassigned: {
        type: Boolean,
        required: false,
        default: false
    },
    isok: {
        type: Boolean,
        required: false
    },
    ispaid: {
        type: Boolean,
        required: false
    },
    isOperable: {
        type: Boolean,
        required: false
    },
    internalnotes: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'lead'
    },
    mailsent: {
        type: Boolean,
        required: false,
        default: false
    },

    ip: {
        type: String,
        required: false
    },
    signature: {
        type: String,
        required: false,
    },
    isagreed: {
        type: Boolean,
        required: false,
        default: false
    },
    agreementurl: {
        type: String,
        required: false

    },


});

module.exports = Lead = mongoose.model('lead', LeadSchema);