const express = require('express');
const router = express.Router();

const User = require('../../models/User')
const Lead = require('../../models/Lead')


router.post('/', (req, res) => {

    const my_token = '8f48f9b934d68a16d6cfc1877227891bc7f4136e053ea0c0b8fdba0f4bbb9536';

    const token = req.body.token;

    if (my_token == token) {
        if (req.body.toflush == 'lead') {
            Lead.remove({})
                .then(() => res.status(200).json({ LeadsFlushed: "Success" }));
        } else if (req.body.toflush == 'user') {
            User.remove({})
                .then(() => res.status(200).json({ UsersFlushed: "Success" }))
        } else {
            res.status(400).json({ Msg: "Please Specify What to flush?" })
        }
    } else {
        res.status(404).json({ Msg: "You Are Not Allowed ;[" })
    }

});


module.exports = router;