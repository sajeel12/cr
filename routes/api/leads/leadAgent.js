const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth')


// lead Model 
const User = require('../../../models/User')
const Lead = require('../../../models/Lead');
const { json } = require('express');



router.get('/:id', auth, (req, res) => {
    User.findById(req.user.id).then(user => {
        
            Lead.find({ owner: req.params.id })
                .sort({ recieveddate: -1 })
                .then(leads => res.json(leads))
        }

    

    );




})



module.exports = router;