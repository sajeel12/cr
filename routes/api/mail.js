
const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

const Lead = require('../../models/Lead');
const User = require('../../models/User');




router.post('/', (req, res) => {


    let mailTransporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: req.body.email, // generated ethereal user  kevin@smtransports.us
            pass: req.body.emailpass, // generated ethereal password          kevintest
        },
    });



    let mailDetails = {
        from: req.body.email,
        to: req.body.to,
        subject: req.body.subject,
        text: 'SM Transports',
        html: req.body.html
    };

    // `  <h4>   Please Confirm your Shipment <a href="http://www.crmsmtransports.site/agreement?hash_id=${req.body.id}" >Click here</a>  </h4> 
    // <br/> <hr/>  <h2 style='color:red' > HS Logistics </h2> `

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Fail bhai', err)
            console.log(req.body.html)
        } else {
            console.log('success')
            // console.log(req.body.html)
            if (!req.body.vendor) {
                if (req.body.many) {
                    Lead.updateMany({ _id: { $in: req.body.id } }, {
                        mailsent: true
                    }, { new: true })
                        .exec((err, lead) => {
                            if (err)
                                res.status(404).json({ success: false });
                            else
                                res.status(200).json(lead);
                        })
                } else {
                    Lead.findByIdAndUpdate(req.body.id, {
                        "mailsent": true,
                        $inc: { "mailcount": 1 }
                    }, { new: true })
                        .exec((err, lead) => {
                            if (err)
                                res.status(404).json({ success: false });
                            else
                                res.status(200).json(lead);
                        })
                }
            } else {
                console.log(req.body);
                User.findByIdAndUpdate({_id:req.body.id}, {
                    "mailsent": true
                }, { new: true })
                    .exec((err, user) => {
                        if (err)
                            console.log('mailsent success')
                            // res.status(404).json({ sucess: false })
                        else
                        console.log('mailsent false')

                            // res.status(200).json({ success: true })
                    })
            }
        }
    });

    // =========================











});


module.exports = router;