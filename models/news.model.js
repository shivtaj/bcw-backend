const mongoose = require('mongoose');

const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

var newsSchema = new mongoose.Schema({
    news:{
            type:String,
            required:'field can not be empty',
            minlength:[10,'password must be altleast for 4 character']
        }
});


module.export = mongoose.model('News', newsSchema);  