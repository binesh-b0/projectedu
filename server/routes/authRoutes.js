const express = require('express');
const multer = require('multer');
const authController = require('../controller/authController');
const requireAuth = require('../middlewares/requireAuth');

const routes = express.Router();

const upload = multer({
    dest: 'uploads/', storage: multer.memoryStorage()
});

routes.post('/rest/v1/signup/email', authController.signUpUser);

routes.get('/rest/v1/emailVerify/:encodedString', authController.verifyEmail);

routes.post('/rest/v1/login/email', authController.loginUser);

routes.post('/rest/v1/resendVerification', authController.resendVerificationEmail);

routes.post('/rest/v1/addStudentInfo', [requireAuth, upload.fields([{name: 'profilePic', maxCount: 1}, {name: 'certifications', maxCount: 10}])], authController.addStudentInfo);


module.exports = routes;