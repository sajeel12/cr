const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');


const Lead = require('../../../models/Lead');


router.post('/', auth, (req, res) => {

    console.log(`Masoom ${req.body.status} `)
    
    Lead.updateMany({_id :{$in : req.body.ids}}, {
        status: req.body.status


    }, { new: true })
        .exec((err, lead) => {
            if (err)
                res.status(404).json({ success: false });
            else
                res.status(200).json(lead);
        })


});

module.exports = router;