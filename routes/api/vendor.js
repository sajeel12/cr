const express = require('express');
const router = express.Router();

const ShortUniqueId = require('short-unique-id');

const Lead = require('../../models/Lead');
const User = require('../../models/User');


router.post('/', (req, res) => {
    // const mytoken = 'ef44e422c0d287dec044df60e34beaaf1c0c49878fdec010a82755616bf615f9'
    const token = req.body.token;
    console.log(token)
    User.findOne({ password: token })
        .then(user => {
            if (req.body.fullname !== ''
                && req.body.destinationcity !== ''
                && req.body.fullname !== ''
                && req.body.email !== ''
                && req.body.phoneno !== ''

                && req.body.origincity !== ''
                && req.body.originstate !== ''
                && req.body.originzipcode !== ''

                && req.body.destinationcity !== ''
                && req.body.destinationstate !== ''
                && req.body.destinationzipcode !== ''
                && req.body.model !== ''
                && req.body.modelyear !== ''
                && req.body.make !== ''
                && req.body.vehicletype !== ''
            ) {


                const newLead = new Lead({


                    owner: user._id,
                    fullname: req.body.fullname,
                    email: req.body.email,
                    phoneno: req.body.phoneno,
                    origincity: req.body.origincity,
                    originstate: req.body.originstate,
                    originzipcode: req.body.originzipcode,
                    origincountry: req.body.origincountry,
                    destinationcity: req.body.destinationcity,
                    destinationstate: req.body.destinationstate,
                    destinationzipcode: req.body.destinationzipcode,
                    destinationcountry: req.body.destinationcountry,
                    shipdate: req.body.shipdate,
                    internalnotes: req.body.internalnotes,
                    transporttype: req.body.transporttype
                });
                newLead.save()
                    .then(lead =>
                        lead.update({ $push: { vehicle: { $each: req.body.vehicles } } })
                            .then(res.status(200).json({ msg: "success" }))


                    );



            } else {
                res.status(404).json({ msg: "InComplete Fields" })
            }

        })
        .catch(err => res.status(404).json({ msg: "UnAuthorized User" }));


});






module.exports = router;