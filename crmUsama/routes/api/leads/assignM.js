


const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth')


// lead Model 
const User = require('../../../models/User')
const Lead = require('../../../models/Lead');
const { json } = require('express');





router.post('/', auth, (req, res) => {

    Lead.updateMany({_id :{$in : req.body.ids}}, {
        owner: req.body.owner,
        isassigned: true
    }, { new: true })
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


module.exports = router;
