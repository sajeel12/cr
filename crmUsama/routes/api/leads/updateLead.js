const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');


const Lead = require('../../../models/Lead');


router.put('/:id', auth, (req, res) => {
    console.log(req.body)
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
        shipdate: req.body.shipdate,
        price: req.body.price,
        internalnotes: req.body.internalnotes,
        vehicle: []

    }, { new: true })
        .exec((err, lead) => {
            lead.update({ $push: { vehicle: { $each: req.body.vehicle } } })
                .then(res.status(200).json({ msg: "success" }))
        })


});

module.exports = router;