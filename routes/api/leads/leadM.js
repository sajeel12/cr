const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth')


// lead Model 
const User = require('../../../models/User')
const Lead = require('../../../models/Lead');
const { json } = require('express');



// update lead 





// delete request  
router.post('/', auth, (req, res) => {

    User.findById(req.user.id).then(user => {
        if (user.isadmin) {
            Lead.deleteMany({ _id: { $in: req.body.ids } })
                .then(() => res.json({ success: true }))
                .catch(err => res.status(404).json({ success: false }));
        } else {
            res.status(404).json({ success: false });
        }

    });


});





module.exports = router;