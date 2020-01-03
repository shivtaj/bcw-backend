const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlUser = require('../controllers/user.controller');
const ctrlVerification = require('../controllers/verification.controller');
const ctrlEmail = require('../controllers/email.controller');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack)=>{
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack)=>{
        callBack(null,`fileUpload_${file.originalname}`)
    },
})

var upload = multer({storage: storage})


router.post('/register',upload.single('file'), (req, res, next) =>{
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error('please upload the file');
        error.httpStatusCode =400
        return next(error)
    }
    res.send(file);
    var user = new User();
        user.fullName = req.body.fullName;
        user.fatherName = req.body.fatherName;
        user.course = req.body.course;
        user.courseJoin = req.body.courseJoin;
        user.courseEnd = req.body.courseEnd;
        user.dob = req.body.dob;
        user.email = req.body.email;
        user.password = req.body.password;
        user.caption  = req.body.caption;
        user.image = req.body.file;
        user.generate =  Math.floor(Math.random() * 100000000 + 1);
 
        console.log(req.body.image);
 
     
        user.save((err, doc) =>{
            if(!err){
             console.log(doc);
                return res.status(200).json({ "Your registration number is ": user.generate });
                res.send(doc);
            }
            else{
            console.log(err);
            if(err.code==11000){
                res.status(422).send(['duplicate errorr found']);
            }else{
              return next(err);
            }
 
            }
        });
 
 });




// router.post('/register',ctrlUser.register);
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