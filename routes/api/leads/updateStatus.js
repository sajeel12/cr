const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');


const Lead = require('../../../models/Lead');


router.put('/:id', auth, (req, res) => {

    Lead.findByIdAndUpdate(req.params.id, {
        fullname: req.body.fullname,
        

    }, { new: true })
        .exec((err, lead) => {
            if (err)
                res.status(404).json({ success: false });
            else
                res.status(200).json(lead);
        })


});

module.exports = router;