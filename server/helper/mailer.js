const nodemailer = require('nodemailer');

exports.sendVerificationMail = function (encodedString) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: 'admin@maxffort.com',
        subject: 'Verify email',
        html: '<h4>Verification</h4><p>Please verify your account for completing your authentication</p><a href="http://28ee46a948b4.ngrok.io/rest/v1/emailVerify/'+encodedString+'">Click here to verify</a>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}
