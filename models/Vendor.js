const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema 

const VendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = Vendor = mongoose.model('vendor', VendorSchema);