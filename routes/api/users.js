const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
// Item Model 
const User = require('../../models/User')


// Post request  
router.post('/', (req, res) => {
    // console.log(req.body);
    const { isadmin ,fullname, username, email , phoneno, password } = req.body;


    if (!username || !fullname || !phoneno || !email || !password ) {
        return res.status(400).json({ msg: 'credintials not provided' })
    }

    User.findOne({ email })            // {email : email} ---> just {email}  because they are same
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User Already exits' })

            const newUser = User({
                isadmin,
                fullname,
                username,
                email,

                phoneno,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                        // .then(user => {

                        //     jwt.sign(
                        //         { id: user.id },   //payload e.g.  data
                        //         config.get('jwtSecret'),             //secret key
                        //         { expiresIn: 3600 },              // 3600 seconds ( optional )
                        //         (err, token) => {
                        //             if (err) throw err;
                        //             res.json({
                        //                 token,
                        //                 user: {
                        //                     id: user.id,
                        //                     username: user.username,
                        //                     fullname: user.fullname,
                        //                     email: user.email,
                        //                     phoneno: user.phoneno,
                        //                     password: user.password
                        //                 }
                        //             })
                        //         }
                        //     );
                        // });

                });
            });

        });
});





module.exports = router;