const express = require('express');
const multer = require('multer');
const adminController = require('../controller/adminController');
const studentController = require('../controller/studentController');
const requireAuth = require('../middlewares/requireAuth');

const routes = express.Router();

const upload = multer({
    dest: 'uploads/', storage: multer.memoryStorage()
});


routes.post('/rest/v1/addStudentInfo', [requireAuth, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'certificates', maxCount: 10 }])], studentController.addStudentInfo);

routes.post('/rest/v1/getAvailableExams', [requireAuth], studentController.getStudentExams);

routes.post('/rest/v1/getExamQuestions', [requireAuth], studentController.getExamQuestions);

routes.post('/rest/v1/getExamInstructions', [requireAuth], studentController.getExamInstructions);

routes.get('/rest/v1/getProfile', [requireAuth], studentController.getStudentProfile);

routes.post('/rest/v1/getTextAd', [requireAuth], studentController.getTextAd);

module.exports = routes;
