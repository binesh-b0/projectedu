const express = require('express');
const multer = require('multer');
const authController = require('../controller/authController');


const routes = express.Router();

const upload = multer({ dest: 'uploads/' });

routes.post('/rest/v1/signup/email', authController.signUpUser);

routes.get('/rest/v1/emailVerify/:encodedString', authController.verifyEmail);

routes.post('/rest/v1/login/email', authController.loginUser);

routes.post('/rest/v1/resendVerification', authController.resendVerificationEmail);

routes.post('/rest/v1/addStudentInfo', upload.single('image'), authController.addStudentInfo);

module.exports = routes;