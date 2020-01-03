const mongoose = require('mongoose');

const User = mongoose.model('User');
const News = mongoose.model('News');
const Image = mongoose.model('Image');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req, res, next) =>{
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
 
 }

// module.exports.register = (req, res, next) =>{
//    var user = new User();
//        user.fullName = req.body.fullName;
//        user.fatherName = req.body.fatherName;
//        user.course = req.body.course;
//        user.courseJoin = req.body.courseJoin;
//        user.courseEnd = req.body.courseEnd;
//        user.dob = req.body.dob;
//        user.email = req.body.email;
//        user.password = req.body.password;
//        user.caption  = req.body.caption;
//        user.image = req.body.file;
//        user.generate =  Math.floor(Math.random() * 100000000 + 1);

//        console.log(req.body.image);

    
//        user.save((err, doc) =>{
//            if(!err){
//             console.log(doc);
//                return res.status(200).json({ "Your registration number is ": user.generate });
//                res.send(doc);
//            }
//            else{
//            console.log(err);
//            if(err.code==11000){
//                res.status(422).send(['duplicate errorr found']);
//            }else{
//              return next(err);
//            }

//            }
//        });

// }
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        if (user)
         return res.status(200).json({ "token": user.generateJwt()});
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res, next) =>{
    console.log('user profile');
    User.findOne({ email: req.email
    },
        console.log(req.email),
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
            console.log('user is avaliable');
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
        }
    );
}

module.exports.userVerify = (req, res, next) =>{
    res.send(req.body.email);
    User.findOne({ registration: req.generate},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                 return res.status(200).json({ status: true, user : _.pick(user,['generate']) });
        }
    );
}

module.exports.userList = (req, res, next) =>{
    
    User.find({},function(err,user){
        var userMap ={};

        user.forEach(function(user){
            userMap[user._id] = user;
        });
        res.send(userMap);
    });

}

module.exports.news = (req, res, next) =>{
    
    res.send('chek 123');
    News.find({email: email}, function(err, email) {
        if(err) {
           next(err); //pass your error to error handler
        } else {
            console.log('check67')
        //    res.render('user/userList', {title: 'user list',email:email}); 
        }
     });
}

module.exports.imagupload = (req, res, next)=>{

    var image = new Image();
    image.save((err, file) =>{
        if(!err){
            console.log('file is uploaded correctly')
            console.log(file);
               return res.status(200).json({ "Your imag eis uploaded ": image.image });
            //    console.log(doc);
            //    res.send(doc);
           }else{
            if(err.code==11000){
               res.status(422).send(['duplicate errorr found']);
           }else{
             return next(err);
           }

           }
});
}


