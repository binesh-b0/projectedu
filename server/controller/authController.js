const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const connection = require('../database/conn');
const mailer = require('../helper/mailer');

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: path.join(__dirname, '../google_service_key/hsstwebapp-0665d0bc24b1.json')
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

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
                // return res.status(200).send({ response: 'Account verified' });
                return res.redirect('http://localhost:3000/signin');
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
                return res.status(404).send({ error: 'Email id not registered or verified' });
            }
            console.log(results[0].Password);
            console.log(password);
            bcrypt.compare(password, results[0].Password, (err, isMatch) => {
                if (err) {
                    return res.status(401).send({ error: 'Something went wrong ' + err });
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
                        mailer.sendVerificationMail(encodedString);
                        res.status(200).send({ response: 'Verification Email Sent' });
                    }
                );

            });


        }
    );
}

exports.addStudentInfo = function (req, res) {

    var imageUrls = {
        profilePic: null,
        certPics: []
    };
    var promises = [];
    req.files.profilePic.forEach(image => {
        var gscName = Date.now() + image.originalname;
        var blob = bucket.file(gscName);

        const promise = new Promise((resolve, reject) => {
            var blobStream = blob.createWriteStream({
                metadata: {
                    contentType: image.mimetype
                }
            });

            blobStream.on('error', (err) => {
                reject(err);
            });

            blobStream.on('finish', async () => {
                try {
                    await blob.makePublic();
                    var publicUrl = format(
                        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
                    );
                    imageUrls.profilePic = publicUrl;
                    resolve();
                } catch (error) {
                    reject(error);
                }

            });

            blobStream.end(image.buffer);

        });

        promises.push(promise);
    });

    req.files.certifications.forEach(certificateImage => {
        var gcsCertName = Date.now() + certificateImage.originalname;
        var certBlob = bucket.file(gcsCertName);

        const certPromise = new Promise((resolve, reject) => {
            var certBlobStream = certBlob.createWriteStream({
                metadata: {
                    contentType: certificateImage.mimetype
                }
            });

            certBlobStream.on('error', (err) => {
                reject(err);
            });

            certBlobStream.on('finish', async () => {
                try {
                    await certBlob.makePublic();
                    var certPublicUrl = format(
                        `https://storage.googleapis.com/${bucket.name}/${certBlob.name}`
                    );
                    imageUrls.certPics.push(certPublicUrl);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            certBlobStream.end(certificateImage.buffer);
        });
        promises.push(certPromise);
    });

    Promise.all(promises).then(_ => {
        const { fullName, gender, dob, guardianName, relationToGuardian } = req.body.userInfo;
        const { residence, permanent } = req.body.addressInfo;
        const { schoolName10, cgpa10, board10, location10, schoolName12, cgpa12, board12, location12 } = req.body.academics;
        connection.query(
            "INSERT INTO Students (CredentialId, FullName, Gender, Dob, GuardianName, RelationToGuardian, ProfilePic) VALUES (?,?,?,?,?,?,?)",
            [req.user.id, fullName, gender, dob, guardianName, relationToGuardian, imageUrls.profilePic],
            function (error, results, fields) {
                if (error) {
                    return res.status(500).send({ error: 'Internal Server Error' });
                }
                const studentInfoId = results.insertId;
                connection.query(
                    "INSERT INTO Address (StudentId, AddressLine1, AddressLine2, City, State, Zipcode, PhoneNo, Type) VALUES (?,?,?,?,?,?,?,?),(?,?,?,?,?,?,?,?)",
                    [studentInfoId, residence.addressLine1, residence.addressLine2, residence.city, residence.state, residence.zipcode, residence.phoneNo, 'residence', studentInfoId, permanent.addressLine1, permanent.addressLine2, permanent.city, permanent.state, permanent.zipcode, permanent.phoneNo, 'permanent'],
                    function (error, results, fields) {
                        if (error) {
                            return res.status(500).send({ error: 'Internal Server Error' });
                        }
                        connection.query(
                            "INSERT INTO Academics (StudentId, SchoolName10, Cgpa10, Board10, Location10, SchoolName12, Cgpa12, Board12, Location12) VALUES (?,?,?,?,?,?,?,?,?)",
                            [studentInfoId, schoolName10, cgpa10, board10, location10, schoolName12, cgpa12, board12, location12],
                            function (error, results, fields) {
                                if (error) {
                                    return res.status(500).send({ error: 'Internal Server Error' });
                                }
                                var queryString = "INSERT INTO Degree (StudentId,CollegeName, Cgpa, Degree, Location) VALUES ";
                                req.body.degree.forEach(degree => {
                                    queryString += "('" + studentInfoId + "','" + degree.collegeName + "','" + degree.cgpa + "','" + degree.degree + "','" + degree.location + "'),";
                                });

                                queryString = queryString.slice(0, -1);
                                console.log(queryString);
                                connection.query(
                                    queryString, [], function (error, results, fields) {
                                        if (error) {
                                            return res.status(500).send({ error: 'Internal Server Error' });
                                        }
                                        var queryString = "INSERT INTO Certifications (StudentId, CertificationName, CompletionDate, ValidityDate, Institute, CertificateUrl) VALUES ";
                                        req.body.certifications.forEach((certificate, index) => {
                                            queryString += "('" + studentInfoId + "','" + certificate.certificationName + "','" + certificate.completionDate + "','" + certificate.validityDate + "','" + certificate.institute + "','" + imageUrls.certPics[index] + "'),";
                                        });

                                        queryString = queryString.slice(0, -1);
                                        console.log(queryString);
                                        connection.query(
                                            queryString, [], function (error, results, fields) {
                                                if (error) {
                                                    return res.status(500).send({ error: 'Internal Server Error' });
                                                }

                                                return res.status(200).send({response: 'User successfully registered'});
                                            }
                                        );

                                    }
                                );

                            }
                        );
                    }

                );

            }
        );
        
    }).catch(err => {
        return res.status(500).send({ error: 'Internal Server Error' });
    })

}   
