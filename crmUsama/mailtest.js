
const nodemailer = require('nodemailer');





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
    to: 'amirnazir2828@gmail.com',
    subject: "love you Masoom",
    text: 'Masoom network hired you',
    html: " <h1>   Salam from masoom network   you are hired </h1> <br/>  <h2 style='color:red' >Love you  Amir </h2> "
};

mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
        console.log('Fail bhai', err)
    } else {
        console.log('success')
    }
});












// module.exports = router;