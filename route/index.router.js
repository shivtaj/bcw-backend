const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwtHelper = require('../config/jwtHelper');
const ctrlUser = require('../controllers/user.controller');
const ctrlVerification = require('../controllers/verification.controller');
const ctrlEmail = require('../controllers/email.controller');


router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
// router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userProfile',ctrlUser.userProfile);
router.post('/verification',ctrlVerification.authenticate);
router.post('/userverify', ctrlUser.userVerify);
router.get('/userlist', ctrlUser.userList);
router.post('/news', ctrlUser.news);
router.post('/sendmail', ctrlEmail.sendmail);
router.get('/getmail', ctrlEmail.getmail);
router.post('/imageupload', ctrlUser.imagupload);


module.exports = router;