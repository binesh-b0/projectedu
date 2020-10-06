const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const connection = require('../database/conn');
const mailer = require('../helper/mailer');
const { resolve } = require('path');
const util = require('util');
const { stringify } = require('querystring');
const { type } = require('os');


exports.verifyEmail = function (req, res) {
    const encodedString = req.params.encodedString;

    if (!encodedString) {
        return res.status(409).send({ error: 'Invalid Url' });
    }

    jwt.verify(encodedString, process.env.SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        const { studentId, timestamp } = payload;
        const curTimestamp = new Date();
        const linkTimestamp = new Date(timestamp);
        const timeDifference = curTimestamp.getTime() - linkTimestamp.getTime();

        const minDifference = Math.floor(timeDifference / 1000 / 60);
        if (minDifference > 30) {
            return res.status(403).send({ error: 'Verification link has expired' });
        }

        connection.query(
            "UPDATE Credentials set IsVerified = 1 WHERE id = ?", [studentId], function (error, results, fields) {
                if (error) {
                    res.status(500).send({ error: 'Internal Server Error' });
                    return;
                }
                // return res.status(200).send({ response: 'Account verified' });
                return res.redirect('https://hsst-edu-project.web.app/signin');
            }
        );
    });
}

exports.loginUser = function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).send({ error: "Email and password is required" })
    }

    connection.query(
        "SELECT * FROM Credentials where Email = ? and IsVerified = 1", [email], function (error, results, fields) {
            if (error) {
                return res.status(500).send({ error: 'Internal Server Error ' + error });
            }
            if (results.length == 0) {
                return res.status(404).send({ error: 'Email id not registered or verified' });
            }
            bcrypt.compare(password, results[0].Password, (err, isMatch) => {
                if (err) {
                    return res.status(401).send({ error: 'Something went wrong ' + err });
                }
                if (!isMatch) {
                    return res.status(401).send({ error: 'Wrong credentials' });
                }
                const token = jwt.sign({ studentId: results[0].id }, process.env.SECRET_KEY);
                connection.query(
                    "SELECT * FROM Students WHERE CredentialId = ?", [results[0].id], function (error, results, fields) {
                        if (error) {
                            return res.status(500).send({ error: 'Internal Server Error ' + error });
                        }
                        if (results.length > 0) {
                            var isRegistered = true;
                        } else {
                            var isRegistered = false;
                        }
                        res.status(200).send({ response: token, isRegistered: isRegistered });
                    }
                );

            });

        }
    );
}

exports.resendVerificationEmail = function (req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(401).send({ error: 'Email is required' });
    }
    console.log(email);
    connection.query(
        "SELECT * FROM Credentials where Email = ? and IsVerified = 0", [email], function (error, results, fields) {
            if (error) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            if (results.length == 0) {
                return res.status(401).send({ error: 'Email not registered, sign up again' });
            }

            const studentId = results[0].id;
            const encodedString = jwt.sign({ studentId: studentId }, process.env.SECRET_KEY);
            mailer.sendVerificationMail(encodedString);
            res.status(200).send({ response: 'Verification email sent' });
        }
    );
}

exports.forgotAdminPassword = function (req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(401).send({ error: 'Email is required' });
    }

    connection.query(
        "SELECT * FROM AdminCredentials WHERE Email = ? and Status = 'active'", [email], function (error, results, fields) {
            if (error) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            if (results.length == 0) {
                return res.status(409).send({ error: 'Email Id not registered or active' });
            }

            const adminId = results[0].id;
            const timestamp = new Date();
            const encodedString = jwt.sign({ adminId: adminId, timestamp: timestamp }, process.env.SECRET_KEY);
            mailer.sendPasswordResetMail(encodedString, email, 'admin');
            res.status(200).send({ response: 'Verification email sent' });
        }
    );
}

exports.forgotPassword = function (req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(401).send({ error: 'Email is required' });
    }

    connection.query(
        "SELECT * FROM Credentials where Email = ? and IsVerified = 1", [email], function (error, results, fields) {
            if (error) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            if (results.length == 0) {
                return res.status(409).send({ error: 'Email Id not registered or verified' });
            }

            const studentId = results[0].id;
            const timestamp = new Date();
            const encodedString = jwt.sign({ studentId: studentId, timestamp: timestamp }, process.env.SECRET_KEY);
            mailer.sendPasswordResetMail(encodedString, email);
            res.status(200).send({ response: 'Verification email sent' });
        }
    );
}

exports.resetAdminPasswordRouting = function (req, res) {
    const encodedString = req.params.encodedString;
    if (!encodedString) {
        return res.status(409).send({ error: 'Invalid Url' });
    }

    res.direct(`http://localhost:3000/reset/${encodedString}`);
}


exports.resetPasswordRouting = function (req, res) {
    const encodedString = req.params.encodedString;
    if (!encodedString) {
        return res.status(409).send({ error: 'Invalid Url' });
    }

    res.redirect(`https://hsst-edu-project.web.app/reset/${encodedString}`);
}

exports.resetAdminPassword = function (req, res) {
    const { encodedString, password } = req.body;
    if (!encodedString || !password) {
        return res.status(409).send({ error: 'Request not valid' });
    }
    const { adminId, timestamp } = payload;
    const curTimestamp = new Date();
    const linkTimestamp = new Date(timestamp);
    const timeDifference = curTimestamp.getTime() - linkTimestamp.getTime();

    const minDifference = Math.floor(timeDifference / 1000 / 60);
    if (minDifference > 30) {
        return res.status(403).send({ error: 'Verification link has expired' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({ error: 'Internal Server Error: ' });
        }

        connection.query(
            "UPDATE AdminCredentials SET Password = ? WHERE id = ?", [hash, adminId], function (error, results, fields) {
                if (error) {
                    return res.status(500).send({ error: 'Internal Server Error' });
                }
                res.status(200).send({ response: 'Password reset successfully' });
            }
        );
    });
}

exports.resetPassword = function (req, res) {
    const { encodedString, password } = req.body;
    if (!encodedString || !password) {
        return res.status(409).send({ error: 'Request not valid' });
    }

    jwt.verify(encodedString, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(409).send({ error: 'Unauthorized request' });
        }
        const { studentId, timestamp } = payload;
        const curTimestamp = new Date();
        const linkTimestamp = new Date(timestamp);
        const timeDifference = curTimestamp.getTime() - linkTimestamp.getTime();

        const minDifference = Math.floor(timeDifference / 1000 / 60);
        if (minDifference > 30) {
            return res.status(403).send({ error: 'Verification link has expired' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({ error: 'Internal Server Error: ' });
            }

            connection.query(
                "UPDATE Credentials SET Password = ? WHERE id = ?", [hash, studentId], function (error, results, fields) {
                    if (error) {
                        return res.status(500).send({ error: 'Internal Server Error' });
                    }
                    res.status(200).send({ response: 'Password reset successfully' });
                }
            );
        });
    });
}

exports.signUpUser = function (req, res) {
    console.log("Entered");
    const { email, password } = req.body;
    console.log("ENail ", email, password);
    if (!email || !password) {
        return res.status(401).send({ error: 'Email and password is required' });
    }

    connection.query(
        "SELECT * FROM Credentials where Email = ?", [email], function (error, results, fields) {
            if (error) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            if (results.length > 0) {
                return res.status(409).send({ error: 'Email Id is already registered' });
            }


            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).send({ error: 'Internal Server Error: ' });
                    return;
                }

                connection.query(
                    "INSERT INTO Credentials (Email,Password) VALUES (?,?)", [email, hash], async function (error, results, fields) {
                        if (error) {
                            res.status(500).send({ error: 'Internal Server Error' });
                            return;
                        }
                        const studentId = results.insertId;
                        const timestamp = new Date();
                        const encodedString = jwt.sign({ studentId: studentId, timestamp: timestamp }, process.env.SECRET_KEY);
                        mailer.sendVerificationMail(encodedString, email);
                        res.status(200).send({ response: 'Verification Email Sent' });
                    }
                );

            });


        }
    );
}




exports.adminLogin = function (req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return res.status(400).send({ error: 'Username and Password Required' });
    }

    connection.query(
        "SELECT * FROM AdminCredentials WHERE Username = ? and Status = 'active'", [username], function (error, results, fields) {
            if (error) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            if (results.length == 0) {
                return res.status(401).send({ error: 'Username is not registered or active' });
            }
            console.log("Admin pass", results[0]);
            bcrypt.compare(password, results[0].Password, (err, isMatch) => {
                if (err) {
                    return res.status(401).send({ error: 'Something went wrong ' + err });
                }
                if (!isMatch) {
                    return res.status(401).send({ error: 'Wrong credentials' });
                }
                const timestamp = new Date();
                const token = jwt.sign({ adminId: results[0].id, timestamp: timestamp }, process.env.SECRET_KEY);

                const cookieResponse = {
                    token
                };
                console.log("toekn", cookieResponse);
                res.cookie("adminToken", cookieResponse);
                res.status(200).send({ response: { token: token, user: results[0] } });

            });

        }
    );
}

