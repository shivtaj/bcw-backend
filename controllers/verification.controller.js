const mongoose = require('mongoose');

const Verification = mongoose.model('Verification');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req, res, next) =>{
   var verification = new Verification();
       verification.dob = req.body.dob;
       verification.email = req.body.email;
       verification.password = req.body.password;
    
       verification.save((err, doc) =>{
           if(!err){
               console.log(doc);
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
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, verification, info) => {
        // error from passport middleware
        if (err) return res.status(404).json(err);
        // registered user
        if (verification) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

// module.exports.userProfile = (req, res, next) =>{
//     User.findOne({ _id: req._id },
//         (err, user) => {
//             if (!user)
//                 return res.status(404).json({ status: false, message: 'User record not found.' });
//             else
//                 return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
//         }
//     );
// }