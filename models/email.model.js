const mongoose = require('mongoose');

const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

var emailSchema = new mongoose.Schema({
    text:{
        type:String,
        required:"Name should not be empty"
    },

});



module.export = mongoose.model('Email', emailSchema);  