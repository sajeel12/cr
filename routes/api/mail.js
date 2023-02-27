
const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');

const Lead = require('../../models/Lead')




router.post('/', (req, res) => {

    console.log("in mailjs")


    // let mailTransporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'msajeelahmad2001@gmail.com',
    //         pass: 'jyjzbttlmkiwnwrr'
    //     }
    // });

    let mailTransporter = nodemailer.createTransport({
        host: "smtp.titan.email",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "kevin@smtransports.us", // generated ethereal user
            pass: "kevintest", // generated ethereal password
        },
    });



    let mailDetails = {
        from: 'kevin@smtransports.us',
        to: req.body.to,
        subject: "love you Masoom",
        text: 'Masoom network hired you',
        html: " <h1>   Salam from masoom network   you are hired </h1> <br/>  <h2 style='color:red' >Love you  Amir </h2> "
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Fail bhai', err)
        } else {
            console.log('success')
            console.log(req.body.id)
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
                    "mailsent": true
                }, { new: true })
                    .exec((err, lead) => {
                        if (err)
                            res.status(404).json({ success: false });
                        else
                            res.status(200).json(lead);
                    })
            }
        }
    });

    // =========================











});


module.exports = router;