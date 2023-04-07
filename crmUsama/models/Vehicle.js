const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VehicleSchema = new Schema({
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

})




module.exports = Vehicle = mongoose.model('vehicle', VehicleSchema);
