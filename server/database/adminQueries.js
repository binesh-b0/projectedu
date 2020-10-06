const { response } = require('express');
const { resolve } = require('path');
const connection = require('./conn');

exports.getAdminUsers = function (admin) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT id, Email, Username, Name, Role, Status FROM AdminCredentials WHERE id <> ? ", [admin.id], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getAdminRoles = function (role) {
    var permissions = {};

    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM AdminRoles WHERE RoleId = ?", [role], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                results.map(permission => {
                    permissions[permission.FeatureId] = {};
                });
                results.map(permission => {
                    var operations = permission.OperationsId;
                    var operationsArr = operations.split(",");
                    permissions[permission.FeatureId][permission.SubFeatureId] = operationsArr;
                });

                resolve(permissions);
            }
        );
    });
}

exports.checkIfAdminExists = function (username) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM AdminCredentials WHERE Username = ?", [username], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }

                if (results.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
    });
}

exports.insertAdminData = function (email, username, name, hash, role) {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO AdminCredentials (Email, Username, Name, Password, Role) VALUES (?,?,?,?,?)", [email, username, name, hash, role], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve('User Created');
            }
        );
    });
}

exports.updateAdminUser = function (id, email, username, name, role) {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE AdminCredentials SET Email = ?, Username = ?, name = ?, Role = ? WHERE id = ?", [email, username, name, role, id], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve('User updated successfully');
            }
        );
    });
}

exports.toggleUserActivation = function (id, status) {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE AdminCredentials SET Status = ? WHERE id = ?", [status, id], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve('User status updated');
            }
        );
    });
}

exports.deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM AdminCredentials WHERE id = ?", [id], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve('User deleted');
            }
        );
    });
}

exports.createExam = function (exam) {
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO Exams (Title, StartDate, StartTime, EndDate, EndTime, duration, negativeMarking) VALUES (?,?,?,?,?,?,?)", [exam.title, exam.startDate, exam.startTime, exam.endDate, exam.endTime, exam.duration, exam.negativeMarking || 0], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.addInstructions = function (examId, instructions) {
    return new Promise((resolve, reject) => {
        if (instructions.length == 0) {
            reject(new Error('No instructions found'));
        }
        var query = "INSERT INTO ExamInstructions (ExamId, Instruction) VALUES ";
        instructions.forEach(instruction => {
            query += "('" + examId + "','" + instruction + "'),"
        });
        query = query.slice(0, -1);
        console.log(query);
        connection.query(
            query, [], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.addQuestions = function (examId, questions) {
    return new Promise((resolve, reject) => {
        if (questions.length == 0) {
            reject(new Error('No questions found'));
        }
        var query = "INSERT INTO Questions (ExamId, Question, Option1, Option2, Option3, Option4, Answer, Type, Mark) VALUES ";
        questions.forEach(question => {
            query += "('" + examId + "','" + question.question + "','" + question.option1 + "','" + question.option2 + "','" + question.option3 + "','" + question.option4 + "','" + question.answer + "','" + question.type + "','" + question.mark + "'),";
        });
        query = query.slice(0, -1);
        console.log(query);
        connection.query(
            query, [], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

// exports.getStudentProfile = function(studentId){
//     return new Promise((resolve, reject) => {
//         var query = "SELECT ";
//     }); 
// }

exports.getExams = function (limit, offset) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Exams LIMIT " + limit + " OFFSET " + offset;

        connection.query(
            query, [], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getExamInfo = function (examId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Exams WHERE id = " + examId;
        console.log(query);
        connection.query(
            query, [], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                console.log("blah ", results);
                resolve(results[0]);
            }
        );
    });
}

exports.toggleExamStatus = function (examId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM Exams WHERE id = ?", [examId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                if (results[0].Status == 'active') {
                    connection.query(
                        "UPDATE Exams SET Status = 'inactive' WHERE id = ?", [examId], function (error, results) {
                            if (error) {
                                reject(new Error(error));
                            }
                            resolve("Exam disabled");
                        }
                    );
                } else {
                    connection.query(
                        "UPDATE Exams SET Status = 'active' WHERE id = ?", [examId], function (error, results) {
                            if (error) {
                                reject(new Error(error));
                            }
                            resolve("Exam enabled");
                        }
                    );
                }
            }
        );
    });
}

exports.getInstructions = function (examId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM ExamInstructions WHERE ExamId = ?", [examId], function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getSubUserExams = function (limit, offset, username) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM Exams WHERE AssignedTo = ? LIMIT ? OFFSET ?", [username, limit, offset], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.editExam = function (exam) {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE Exams SET Title = ?, StartDate = ?, StartTime = ?, EndDate = ?, EndTime = ?, Duration = ?, Status = ?, NegativeMarking = ? WHERE id = ?",
            [exam.title, exam.startDate, exam.startTime, exam.endDate, exam.endTime, exam.duration, exam.status || 'active', exam.negativeMarking || 0, exam.id],
            function (error, results) {
                if (error) {
                    reject(new Error(error));
                }
                resolve('Exam updated');
            }
        );
    });
}

exports.getExamQuestions = function (examId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM Questions WHERE ExamId = ?", [examId], function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}


exports.editQuestion = function (question) {
    return new Promise((resolve, reject) => {
        connection.query(
            "UPDATE Questions SET Question = ?, Option1 = ?, Option2 = ?, Option3 = ?, Option4 = ?, Answer = ?, Type = ?, Mark = ? WHERE id = ?",
            [question.question, question.option1, question.option2, question.option3, question.option4, question.answer, question.type, question.mark, question.id],
            function (error, results, fields) {
                if (error) {
                    reject(new Error(error));
                }
                resolve("Question Updated");
            }
        );
    });
}

exports.getStudents = function () {
    return new Promise((resolve, reject) => {
        const query = "SELECT Credentials.id, Credentials.Email, Students.FullName, Students.Dob, Students.InterviewsAttended, Address.City FROM Credentials INNER JOIN Students on Students.CredentialId = Credentials.id INNER JOIN Address on Address.StudentId = Credentials.id AND Address.Type = 'residence'";
        connection.query(
            query, [], function (error, results) {
                if(error){
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}

exports.getAssignedStudents = function(adminId){
    return new Promise((resolve, reject) => {
        const query = "SELECT Credentials.id, Credentials.Email, Students.FullName, Students.Dob, Students.InterviewsAttended, Address.City FROM Credentials INNER JOIN Students on Students.CredentialId = Credentials.id INNER JOIN Address on Address.StudentId = Credentials.id AND Address.Type = 'residence' AND Credentials.id IN (SELECT StudentId FROM AssignedStudents WHERE AdminId = '"+ adminId +"')";
        connection.query(
            query, [], function(error, results){
                if(error){
                    reject(new Error(error));
                }
                resolve(results);
            }
        );
    });
}