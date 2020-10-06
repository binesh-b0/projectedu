const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendVerificationMail = function (encodedString, email) {
   
    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: email,
        subject: 'Verify email',
        html: '<h4>Verification</h4><p>Please verify your account for completing your authentication</p><a href="https://hsstwebapp.uc.r.appspot.com/rest/v1/emailVerify/'+encodedString+'">Click here to verify</a>'
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

exports.sendPasswordResetMail = function(encodedString, email, user = 'student') {
    
    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: '<h4>Verification</h4><p>Please verify your email before resetting the password</p><a href="https://hsstwebapp.uc.r.appspot.com/rest/v1/'+user+'/passwordResetLink/'+encodedString+'">Click here to verify</a>'
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

exports.sendUserCreatedMail = function(email, username, password) {

    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: email,
        subject: 'User Created',
        html: `<h4>User Credentials</h4><p>Your user account is ready in HSST Portal. Given below is your credentials to login.</p><p><b>Username: ${username}</b></p><p><b>Password: ${password}</b></p><br/>Best Regards<br/>HSST`
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

exports.sendBulkEmail = function(emails, subject, content){

    var mailOptions = {
        from: 'lanciar2017@gmail.com',
        to: emails,
        subject: subject,
        text: content
    }
 
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(new Error(error));
            } else {
                console.log('Email sent: ' + info.response);
                resolve('Email Sent Successfully');
            }
        });
    });
    
}
