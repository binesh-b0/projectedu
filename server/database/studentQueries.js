const connection = require('./conn');

exports.getAvailableExams = function (student, limit, offset) {
    return new Promise((resolve, reject) => {
        const query = "SELECT Exams.* FROM Exams INNER JOIN ApprovedExams on ApprovedExams.ExamId = Exams.id AND ApprovedExams.StudentId = " + student.id + " LIMIT " + limit + " OFFSET " + offset;
        connection.query(
            query, [], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getExamQuestions = function (examId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM Questions WHERE ExamId = ? ORDER BY Type", [examId], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getInstructions = function (examId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM GeneralInstructions", [], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                var resultSet = results;
                connection.query(
                    "SELECT id, Instruction from ExamInstructions WHERE ExamId = ?", [examId], function (error, results, fields) {
                        if (error) {
                            reject(new Error(error));
                        }
                        resultSet = [...resultSet, ...results];
                        resolve(resultSet);
                    }
                );
            }
        );
    });
}

exports.getStudentDetails = function (studentId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT FullName, Gender, Dob, GuardianName, RelationToGuardian, ProfilePic, InterviewsAttended FROM Students WHERE CredentialId = ?",
            [studentId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results[0]);
            }
        );
    });
}

exports.getStudentDegree = function (studentId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT CollegeName, Cgpa, Degree, Location FROM Degree WHERE StudentId = ?",
            [studentId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getStudentCertifications = function (studentId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT CertificationName, CompletionDate, ValidityDate, Institute, CertificateUrl FROM Certifications WHERE StudentId = ?",
            [studentId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getStudentAddress = function (studentId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT AddressLine1, AddressLine2, City, State, Zipcode, PhoneNo, Type FROM Address WHERE StudentId = ?",
            [studentId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getStudentAcademics = function (studentId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT SchoolName10, Cgpa10, Board10, Location10, SchoolName12, Cgpa12, Board12, Location12 FROM Academics WHERE StudentId = ?",
            [studentId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results[0]);
            }
        );
    });
}