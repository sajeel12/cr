const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')


// lead Model 
const User = require('../../models/User')
const Lead = require('../../models/Lead');
const { json } = require('express');

// get request 
router.get('/', auth, (req, res) => {

    User.findById(req.user.id).then(user => {
        // .populate({ path: 'owner', options: { sort: { recieveddate: -1 } } })

        if (user.isadmin) {
            Lead.find({})
                .populate('owner').sort({ recieveddate: -1 })
                .exec((err, lead) => {
                    if (err) throw (err);
                    // console.log(lead)
                    res.json(lead);
                });

        } else {

            Lead.find({ owner: user._id })
                .sort({ recieveddate: -1 })
                .then(leads => res.json(leads))

        }

    }

    );




})

// Post request  
router.post('/', auth, (req, res) => {
    console.log(req.body)
    User.findById(req.user.id).then(user => {
        const newLead = new Lead({

            owner: user._id,
            // leadid:req.body.id,

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
            shipdate: req.body.shipdate,
            transporttype: req.body.transporttype,
            isoperable: req.body.isoperable
        });
        newLead.save()
            .then(lead =>
                lead.update({ $push: { vehicle: { $each: req.body.vehicle } } })
                    .then(res.status(200).json({ msg: "success" }))
            )
            // .then(lead => res.json(lead));

        // Lead.up
    }

    );

});

// update lead 

router.put('/:id', auth, (req, res) => {

    Lead.findByIdAndUpdate(req.params.id, { "owner": req.body.owner, "isassigned": true }, { new: true })
        .exec((err, lead) => {
            if (err)
                res.status(404).json({ success: false });
            else
                User.findById(req.user.id).then(user => {
                    if (user.isadmin) {
                        Lead.find({})
                            .populate({ path: 'owner', options: { sort: { recieveddate: -1 } } })
                            .exec((err, lead) => {
                                if (err) throw (err);

                                res.json(lead);
                            });
                    } else {
                        Lead.find({ owner: user._id })
                            .sort({ recieveddate: -1 })
                            .then(leads => res.json(leads))
                    }

                }

                );
        })


});





// delete request  
router.delete('/:id', auth, (req, res) => {

    if (req.body.ids) {
        User.findById(req.user.id).then(user => {
            if (user.isadmin) {
                Lead.deleteMany({ _id: { $in: req.body } })
                    .then(() => res.json({ success: true }))
                    .catch(err => res.status(404).json({ success: false }));
            } else {
                res.status(404).json({ success: false });
            }

        });
    }


    User.findById(req.user.id).then(user => {
        if (user.isadmin) {
            Lead.findById(req.params.id)
                .then(lead => lead.remove().then(() => res.json({ success: true })))
                .catch(err => res.status(404).json({ success: false }));
        } else {
            res.status(404).json({ success: false });
        }

    });


});





module.exports = router;