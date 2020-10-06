const express = require('express');
const multer = require('multer');
const authController = require('../controller/authController');


const routes = express.Router();


routes.post('/rest/v1/signup/email', authController.signUpUser);

routes.get('/rest/v1/emailVerify/:encodedString', authController.verifyEmail);

routes.post('/rest/v1/login/email', authController.loginUser);

routes.post('/rest/v1/resendVerification', authController.resendVerificationEmail);

routes.post('/rest/v1/forgotPassword', authController.forgotPassword);

routes.get('/rest/v1/student/passwordResetLink/:encodedString', authController.resetPasswordRouting);

routes.get('/rest/v1/admin/passwordResetLink/:encodedString', authController.resetAdminPasswordRouting);

routes.post('/rest/v1/passwordReset', authController.resetPassword);

routes.post('/rest/v1/admin/login', authController.adminLogin);

routes.post('/rest/v1/admin/forgotPassword', authController.forgotAdminPassword);

routes.post('/rest/v1/admin/resetPassword', authController.resetAdminPassword);

module.exports = routes;