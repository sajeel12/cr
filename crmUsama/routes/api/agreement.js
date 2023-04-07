const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')


// lead Model 
const User = require('../../models/User')
const Lead = require('../../models/Lead');
const { json } = require('express');

// get request 
router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    Lead.findById(id)
        .then(agreement => res.json(agreement))

})



router.post('/', (req, res) => {

    console.log("route", req.body.leadid);

    const lead = Lead.findById({ _id: req.body.leadid });

    if (!lead.isagreed) {
        Lead.findByIdAndUpdate({ _id: req.body.leadid }, {

            ip: req.body.ip,
            signature: req.body.electronicsignature,
            isagreed: true,
            agreementurl: req.body.agreementurl,

            fullname: req.body.fullname,
            email: req.body.email,
            phoneno: req.body.phoneno,
            origincity: req.body.origincity,
            originaddress: req.body.originaddress,
            origincity: req.body.origincity,
            originstate: req.body.originstate,
            originzipcode: req.body.originzipcode,
            destinationaddress: req.body.destinationaddress,
            destinationcity: req.body.destinationcity,
            destinationstate: req.body.destinationstate,
            destinationzipcode: req.body.destinationzipcode,
            model: req.body.model,
            modelyear: req.body.modelyear,
            make: req.body.make,
            vehicletype: req.body.vehicletype,
            shipdate: req.body.shipdate,


        }, { new: true })
            .exec((err, lead) => {
                if (err)
                    res.status(404).json({ success: false });
                else
                    res.status(200).json(lead);
            })
    }

});


module.exports = router;