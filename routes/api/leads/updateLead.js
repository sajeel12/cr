const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');


const Lead = require('../../../models/Lead');


router.put('/:id', auth, (req, res) => {

    Lead.findByIdAndUpdate(req.params.id, {
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
        vehicletype: req.body.vehicletype

    }, { new: true })
        .exec((err, lead) => {
            if (err)
                res.status(404).json({ success: false });
            else
                res.status(200).json(lead);
        })


});

module.exports = router;