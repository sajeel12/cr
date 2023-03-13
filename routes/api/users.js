const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
// Item Model 
const User = require('../../models/User')


// Post request  
router.post('/', (req, res) => {
    const { isvendor, isadmin, fullname, username, email, emailpass, phoneno, password } = req.body;

    console.log(req.body);
    if (req.body.isvendor) {
        if (!fullname || !email || !password) {
            return res.status(400).json({ msg: 'credintials not provided' })
        } else {

            User.findOne({ email })            // {email : email} ---> just {email}  because they are same
                .then(user => {
                    if (user) return res.status(400).json({ msg: 'User Already exits' })

                    const newUser = User({
                        isvendor,
                        fullname,
                       
                        email,
                        
                        password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash
                            newUser.save()


                        });
                    });

                });
        }
    } else {
        if (!username || !fullname || !phoneno || !email || !password) {
            return res.status(400).json({ msg: 'credintials not provided' })
        } else {

            User.findOne({ email })            // {email : email} ---> just {email}  because they are same
                .then(user => {
                    if (user) return res.status(400).json({ msg: 'User Already exits' })

                    const newUser = User({
                        isadmin,
                        fullname,
                        username,
                        email,
                        emailpass,
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
        }
    }
});





module.exports = router;