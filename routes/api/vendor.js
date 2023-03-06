const express = require('express');
const router = express.Router();

const Lead = require('../../models/Lead');


router.post('/', (req, res) => {
    const mytoken = 'ef44e422c0d287dec044df60e34beaaf1c0c49878fdec010a82755616bf615f9'
    const token = req.body.token;
    console.log("form vendor")

    if (token) {
        if (token == mytoken) {
            const newLead = new Lead({

                owner: null,
                fullname: req.body.fullname,
                email: req.body.email,
                phoneno: req.body.phoneno,
                originaddress: req.body.originaddress,
                origincity: req.body.origincity,
                originstate: req.body.originstate,
                originzipcode: req.body.originzipcode,
                destinationaddress: req.body.destinationaddress,
                destinationcity: req.body.destinationcity,
                destinationstate: req.body.destinationstate,
                destinationzipcode: req.body.destinationzipcode,
                model: req.body.model,
                make: req.body.make,
                modelyear: req.body.modelyear,
                vehicletype: req.body.vehicletype,
                shipdate: req.body.shipdate
            });
            newLead.save()
                .then(lead => res.json(lead));

        } else {
            res.status({ msg: 'UnAuthorized 404' })
        }
    }

});






module.exports = router;