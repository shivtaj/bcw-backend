const mongoose = require('mongoose');

const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

var imageSchema = new mongoose.Schema({
    image:{
        data: Buffer, 
        contentType: String,
    },
});


module.export = mongoose.model('Image', imageSchema);  