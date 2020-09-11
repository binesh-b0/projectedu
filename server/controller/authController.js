const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/conn');
const mailer = require('../helper/mailer');

exports.verifyEmail = function (req, res) {
    const encodedString = req.params.encodedString;

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
                return res.status(200).send({ response: 'Account verified' });
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
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            if (results.length == 0) {
                return res.status(404).send({ error: 'Email id not registered' });
            }
            bcrypt.compare(results[0].password, password, (err, isMatch) => {
                if (err) {
                    return res.status(401).send({ error: 'Something went wrong' });
                }
                if (!isMatch) {
                    return res.status(401).send({ error: 'Wrong credentials' });
                }
                const token = jwt.sign({ studentId: results[0].id }, process.env.SECRET_KEY);
                res.status(200).send({ response: token });

            });

        }
    );
}

exports.resendVerificationEmail = function (req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(401).send({ error: 'Email is required' });
    }

    connection.query(
        "SELECT * FROM Credential where Email = ? and IsVerified = 0", [email], function (error, results, fields) {
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

exports.signUpUser = function (req, res) {
    console.log("Entered");
    const { email, password } = req.body;

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

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    res.status(500).send({ error: 'Internal Server Error: ' });
                    return;
                }
                bcrypt.hash(password, salt, (err, hash) => {
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
                            mailer.sendVerificationMail(encodedString);
                            res.status(200).send({ response: 'Verification email sent' });
                        }
                    );

                });
            });

        }
    );
}

exports.addStudentInfo = function (req, res) {
    console.log("userdata ", req.body);
    console.log("iamge", req.file);
    res.status(200).send({response: 'User data received'});
}   