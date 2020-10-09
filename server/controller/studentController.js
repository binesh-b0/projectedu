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
const studentQueries = require('../database/studentQueries');

const storage = new Storage({
    projectId: 'hsstwebapp',
    keyFilename: path.join(__dirname, '../google_service_key/hsstwebapp-0665d0bc24b1.json')
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

exports.addStudentInfo = function (req, res) {

    userInfo = JSON.parse(req.body.userInfo);
    addressInfo = JSON.parse(req.body.addressInfo);
    academics = JSON.parse(req.body.academics);
    degree = JSON.parse(req.body.degree);
    certifications = JSON.parse(req.body.certifications);


    var imageUrls = {
        profilePic: null,
        certPics: []
    };
    var promises = [];
    if ('profilePic' in req.files) {
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
    }

    if ('certificates' in req.files) {
        req.files.certificates.forEach(certificateImage => {
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
    }

    finalPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });

    promises.push(finalPromise);

    Promise.all(promises).then(_ => {
        const { fullName, gender, dob, guardianName, relationToGuardian } = userInfo;
        const { residence, permanent } = addressInfo;
        console.log("Residence", residence);
        const { schoolName10, cgpa10, board10, location10, schoolName12, cgpa12, board12, location12 } = academics;
        try {
            connection.query(
                "INSERT INTO Students (CredentialId, FullName, Gender, Dob, GuardianName, RelationToGuardian, ProfilePic) VALUES (?,?,?,?,?,?,?)",
                [req.user.id, fullName, gender, dob, guardianName, relationToGuardian, imageUrls.profilePic],
                function (error, results, fields) {
                    if (error) {
                        return res.status(500).send({ error: 'Internal Server Error' });
                    }
                    const studentInfoId = req.user.id;
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
                                    for (const property in degree) {
                                        degrees = degree[property];
                                        console.log("Degree new ", degrees);
                                        queryString += "('" + studentInfoId + "','" + degrees.collegeName + "','" + degrees.cgpa + "','" + degrees.degree + "','" + degrees.location + "'),";
                                    }


                                    queryString = queryString.slice(0, -1);
                                    console.log(queryString);
                                    connection.query(
                                        queryString, [], function (error, results, fields) {
                                            if (error) {
                                                return res.status(500).send({ error: 'Internal Server Error' });
                                            }
                                            var queryString = "INSERT INTO Certifications (StudentId, CertificationName, CompletionDate, ValidityDate, Institute, CertificateUrl) VALUES ";
                                            var index = 0;
                                            for (const property in certifications) {
                                                certi = certifications[property];
                                                console.log("certi new ", certi);
                                                queryString += "('" + studentInfoId + "','" + certi.certificationName + "','" + certi.completionDate + "','" + certi.validityDate + "','" + certi.institute + "','" + imageUrls.certPics[index] + "'),";
                                                index++;
                                            }

                                            queryString = queryString.slice(0, -1);
                                            console.log(queryString);
                                            connection.query(
                                                queryString, [], function (error, results, fields) {
                                                    if (error) {
                                                        return res.status(500).send({ error: 'Internal Server Error' });
                                                    }

                                                    return res.status(200).send({ response: 'User successfully registered' });
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
        } catch (error) {
            res.status(500).send({ error: error });
        }


    }).catch(err => {
        return res.status(500).send({ error: 'Internal Server Error' });
    });

}

exports.getStudentExams = async function (req, res) {
    const student = req.user;
    const { limit, offset } = req.body;
    console.log(limit, offset);
    if (!student) {
        return res.status(401).send({ error: 'You are not authorized' });
    }

    try {
        const resultSet = await studentQueries.getAvailableExams(student, limit, offset);
        if (resultSet.length == 0) {
            return res.status(200).send({ response: 'No exams found' });
        }

        return res.status(200).send({ response: resultSet });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.getExamQuestions = async function (req, res) {
    const { examId } = req.body;

    if (!examId) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }

    try {
        const resultSet = await studentQueries.getExamQuestions(examId);
        if (resultSet.length == 0) {
            return res.status(200).send({ response: 'No questions found' });
        }

        return res.status(200).send({ response: resultSet });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getExamInstructions = async function (req, res) {
    const { examId } = req.body;

    if (!examId) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }
    try {
        const resultSet = await studentQueries.getExamInstructions(examId);
        if (resultSet.length == 0) {
            return res.status(200).send({ response: 'No questions found' });
        }

        return res.status(200).send({ response: resultSet });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getStudentProfile = async function (req, res) {
    const student = req.user;
    if (!student) {
        return res.status(401).send({ error: 'Not Authorized' });
    }
    try {
        const studentDetails = await studentQueries.getStudentDetails(student.id);
        const studentDegrees = await studentQueries.getStudentDegree(student.id);
        const studentCertificatons = await studentQueries.getStudentCertifications(student.id);
        const studentAddress = await studentQueries.getStudentAddress(student.id);
        const studentAcademics = await studentQueries.getStudentAcademics(student.id);
        const fullProfile = {
            details: studentDetails,
            degrees: studentDegrees,
            certifications: studentCertificatons,
            address: studentAddress,
            academics: studentAcademics
        }

        return res.status(200).send({ response: fullProfile });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getTextAd = async function (req, res) {
    const user = req.user;
    try {
        var ads = {};
        const resultSet = await studentQueries.getTextAd(user.id);
        if(resultSet.length > 0){
            resultSet.forEach(ad => {
                console.log(ad);
                ads[ad.AdZone] = []
            });
            resultSet.forEach(ad => {
                ads[ad.AdZone].push(ad);
            });
        }
        console.log("ADSS ", ads);
        return res.status(200).send({response: ads});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}