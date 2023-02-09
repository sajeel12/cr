const { json } = require('express');
const express  = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// User model
const User = require('../../models/User');


// get request 
router.get('/', (req, res) => {
    User.find()
        .sort({desc: -1})
        .then(agents => res.json(agents))
        
})



// delete request  
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(()=> res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
});





module.exports = router;