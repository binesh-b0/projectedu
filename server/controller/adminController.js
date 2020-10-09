const bcrypt = require('bcrypt');
const connection = require('../database/conn');
const mailer = require('../helper/mailer');
const adminQueries = require('../database/adminQueries');

exports.updateAdminUser = async function (req, res) {
    const admin = req.user;
    const { userId, operation } = req.body;

    if (!admin) {
        return res.status(401).send({ error: 'You are not authorized' });
    }
    if (!operation) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }

    switch (operation) {
        case 'UPDATE':
            const { email, username, name, role } = req.body;
            if (!email || !username || !name || !role || !userId) {
                return res.status(400).send({ error: 'Required parameters are missing' });
            }
            try {
                const resultSet = await adminQueries.updateAdminUser(userId, email, username, name, role);
                return res.status(200).send({ response: resultSet });
            } catch (error) {
                return res.status(500).send({ error: error });
            }
            break;
        case 'DISABLE':
            if (!userId) {
                return res.status(400).send({ error: 'Required parameters are missing' });
            }
            try {
                const resultSet = await adminQueries.toggleUserActivation(userId, 'inactive');
                return res.status(200).send({ response: resultSet });
            } catch (error) {
                return res.status(500).send({ error: error });
            }
            break;
        case 'ENABLE':
            if (!userId) {
                return res.status(400).send({ error: 'Required parameters are missing' });
            }
            try {
                const resultSet = await adminQueries.toggleUserActivation(userId, 'active');
                return res.status(200).send({ response: resultSet });
            } catch (error) {
                return res.status(500).send({ error: error });
            }
            break;
        case 'DELETE':
            if (!userId) {
                return res.status(400).send({ error: 'Required parameters are missing' });
            }
            try {
                const resultSet = await adminQueries.deleteUser(userId);
                return res.status(200).send({ response: resultSet });
            } catch (error) {
                return res.status(500).send({ error: error });
            }
            break;
        default:
            return res.status(400).send({ error: 'Bad Request' });
    }
}

exports.getAdminUsers = async function (req, res) {
    const admin = req.user;

    if (!admin) {
        return res.status(401).send({ error: 'You are not authorized' });
    }

    try {
        const resultSet = await adminQueries.getAdminUsers(admin);

        if (resultSet.length == 0) {
            return res.status(200).send({ response: 'No users added' });
        }

        return res.status(200).send({ response: resultSet });
    } catch (error) {
        return res.status(500).send({ error: error });
    }

}

exports.getFeatures = async function (req, res) {
    const admin = req.user;
    if (!admin) {
        return res.status(401).send({ error: 'You are not authorized' });
    }
    const role = admin.Role;
    try {
        const resultSet = await adminQueries.getAdminRoles(role);

        return res.status(200).send({ response: resultSet });
    } catch (error) {
        return res.status(500).send({ error: error });
    }

}

exports.createAdminUser = async function (req, res) {
    const { email, username, name, password, role } = req.body;

    if (!email || !username || !name || !password || !role) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }
    try {
        const isAdminExists = await adminQueries.checkIfAdminExists(username);
        if (isAdminExists) {
            return res.status(401).send({ error: 'Username already exists' });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).send({ error: 'Internal Server Error' });
            }

            const resultSet = await adminQueries.insertAdminData(email, username, name, hash, role);
            mailer.sendUserCreatedMail(email, username, password);
            return res.status(200).send({ response: resultSet });
        });
    } catch (error) {
        return res.status(500).send({ error: error });
    }

}

exports.createExam = async function (req, res) {
    const { exam, instructions, questions } = req.body;

    if (!exam || !instructions || !questions) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }
    try {
        const examResult = await adminQueries.createExam(exam);
        await adminQueries.addInstructions(examResult.insertId, instructions);
        await adminQueries.addQuestions(examResult.insertId, questions);
        return res.status(200).send({ response: 'Exam created' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

// exports.getStudentProfile = async function(req, res){
//     const { studentId } = req.body;

//     if(!studentId){
//         return res.status(400).send({ error: 'Required parameters are missing' });
//     }
//     try {
//         const resultSet = await adminQueries.getStudentProfile(studentId);
//         res.status(200).send({response: resultSet});
//     } catch (error) {
//         return res.status(500).send({ error: error });
//     }
// }


exports.toggleExamStatus = async function (req, res) {
    const { examId } = req.body;
    try {
        const result = await adminQueries.toggleExamStatus(examId);
        return res.status(200).send({ response: result });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getExams = async function (req, res) {
    const { limit, offset } = req.body;
    const user = req.user;
    try {
        const isAdmin = (user.Role == 'SUPER_USER') ? true : false;
        if (isAdmin) {
            const resultSet = await adminQueries.getExams(limit, offset);
            return res.status(200).send({ response: resultSet });
        } else {
            const resultSet = await adminQueries.getSubUserExams(user.Username, limit, offset);
            return res.status(200).send({ response: resultSet });
        }

    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getExamDetails = async function (req, res) {
    const { id } = req.body;

    try {
        const exam = await adminQueries.getExamInfo(id);
        const questions = await adminQueries.getExamQuestions(id);
        const instructions = await adminQueries.getInstructions(id);
        const examDetails = {
            exam,
            questions,
            instructions
        };
        return res.status(200).send({ response: examDetails });
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
        const resultSet = await adminQueries.getExamQuestions(examId);
        return res.status(200).send({ response: resultSet });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.editQuestion = async function (req, res) {
    const { question } = req.body;

    if (!question) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }
    try {
        const result = await adminQueries.editQuestion(question);
        return res.status(200).send({ response: result });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.editExam = async function (req, res) {
    const { exam } = req.body;

    if (!exam) {
        return res.status(400).send({ error: 'Required parameters are missing' });
    }

    try {
        const result = await adminQueries.editExam(exam);
        return res.status(200).send({ response: result });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getStudents = async function (req, res) {
    const user = req.user;

    try {
        if (user.Role == 'SUPER_USER') {
            const resultSet = await adminQueries.getStudents();
            return res.status(200).send({ response: resultSet });
        } else {
            const resultSubSet = await adminQueries.getAssignedStudents(user.id);
            return res.status(200).send({ response: resultSubSet });
        }
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.sendBulkEmail = async function (req, res) {
    const { emails, subject, content } = req.body;

    if (!emails || !subject || !content) {
        return res.status(400).send({ error: 'Required Parameters are missing' });
    }
    try {
        const result = await mailer.sendBulkEmail(emails, subject, content);
        console.log("EMAIL ", result);
        return res.status(200).send({ response: result });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.createTextAd = async function (req, res) {
    const { ad, students } = req.body;

    if (!ad) {
        return res.status(400).send({ error: 'Required Parameters are missing' });
    }

    try {
        const resultId = await adminQueries.createTextAd(ad);
        if (students.length > 0) {
            await adminQueries.assignTextAdTo(students, resultId);
        }
        return res.status(200).send({ response: 'Ad created successfully' });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.getAllAds = async function (req, res) {
    try {
        const resultSet = await adminQueries.getAllAds();
        return res.status(200).send({ response: resultSet });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.deleteAd = async function (req, res) {
    const {id} = req.body;
    
    if(!id){
        return res.status(400).send({ error: 'Required Parameters are missing' });
    }

    try {
        const result = await adminQueries.deleteAd(id);
        return res.status(200).send({ response: result });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}