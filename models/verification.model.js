const mongoose = require('mongoose');

const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

var verificationSchema = new mongoose.Schema({
    dob:{
        type:Number,
        required:"DOB should not be empty"
    },
    
    email:{
        type:String,
        required:'email should not be empty',
        unique: true
    },
    password:{
        type:String,
        required:'password can not be empty',
        minlength:[4,'password must be altleast for 4 character']
    },
    saltSecret:String
});

verificationSchema.path('email').validate((val) =>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val));
},'invalid email');

verificationSchema.pre('save',function(next){
     bcrypt.genSalt(10, (err, salt) =>{
         bcrypt.hash(this.password, salt, (err, hash) =>{
             this.password = hash;
             this.saltSecret = salt;
             next();
         });

     });
});

verificationSchema.method.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
verificationSchema.methods.generateJwt = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

module.export = mongoose.model('Verification', verificationSchema);  