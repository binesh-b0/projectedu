const express = require('express');
const multer = require('multer');
const adminController = require('../controller/adminController');
const requireAdminAuth = require('../middlewares/requireAdminAuth');

const routes = express.Router();

routes.post('/rest/v1/admin/createAdminUser', requireAdminAuth,adminController.createAdminUser);

routes.post('/rest/v1/admin/getFeatures', requireAdminAuth, adminController.getFeatures);

routes.post('/rest/v1/admin/getAdminUsers', requireAdminAuth, adminController.getAdminUsers);

routes.post('/rest/v1/admin/updateAdminUser', requireAdminAuth, adminController.updateAdminUser);

routes.post('/rest/v1/admin/createExam', requireAdminAuth, adminController.createExam);

routes.post('/rest/v1/admin/getExams', requireAdminAuth, adminController.getExams);

routes.post('/rest/v1/admin/editExam', requireAdminAuth, adminController.editExam);

routes.post('/rest/v1/admin/getExamQuestions', requireAdminAuth, adminController.getExamQuestions);

routes.post('/rest/v1/admin/editQuestion', requireAdminAuth, adminController.editQuestion);

routes.post('/rest/v1/admin/getExamDetails', requireAdminAuth, adminController.getExamDetails);

routes.post('/rest/v1/admin/toggleExamStatus', requireAdminAuth, adminController.toggleExamStatus);

routes.post('/rest/v1/admin/getStudents', requireAdminAuth, adminController.getStudents);

routes.post('/rest/v1/admin/sendBulkEmail', requireAdminAuth, adminController.sendBulkEmail);

module.exports = routes;