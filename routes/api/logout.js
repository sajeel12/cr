const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


router.get('/', (req, res) => {
    // console.log(" bhai me logout me ho -->>>")
    res.clearCookie('auth_token');

    return res.status(200).redirect('/login');

});



module.exports = router;