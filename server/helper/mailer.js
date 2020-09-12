const nodemailer = require('nodemailer');

exports.sendVerificationMail = function (encodedString, email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: email,
        subject: 'Verify email',
        html: '<h4>Verification</h4><p>Please verify your account for completing your authentication</p><a href="http://9c77ab7139d7.ngrok.io/rest/v1/emailVerify/'+encodedString+'">Click here to verify</a>'
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

exports.sendPasswordResetMail = function(encodedString, email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: '<h4>Verification</h4><p>Please verify your email before resetting the password</p><a href="http://9c77ab7139d7.ngrok.io/rest/v1/passwordResetLink/'+encodedString+'">Click here to verify</a>'
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
