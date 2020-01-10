
const Config = require('./config/config');
const db = require('./models/db');
 require('./config/passportConfig');
 const passport = require('passport');
 const usrRoute = require('./route/index.router');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const cors = require("cors")
var crypto = require('crypto');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'));




app.use(bodyParser.json());
app.use(cors());
app.use('/api',usrRoute);

app.get('/', function (req, res) {
    console.log('get req is running');
    res.render('index');
 });



app.use(passport.initialize());

// Static folder
// app.use('/public', express.static(path.join(__dirname, 'public'))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// try email

let toMail = 'manishbcw12@gmail.com,latika12@gmail.com';
let subject = 'Enter subject line here';
let text = "Enter email content." 

app.post('/email',(req, res, next) => {
    console.log('send mail working');

    let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f0a7eba78a283c",
    pass: "e82a4c1e3495ad"
  }
});
    let mailOptions = {
        from: req.body.email,
        to: toMail,
        subject: subject,
        text: text




        // from: '"Krunal Lathiya" <shivtaj1997@gmail.com>', // sender address
        // to: req.body.email, // list of receivers
        // subject: req.body.subject, // Subject line
        // text: req.body.text, // plain text body
        // html: '<b>NodeJS Email Tutorial</b>' // html body
    };
    console.log(req.body.to);

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);
        // console.log('Message %s sent: %s', info.messageId, info.response);
        res.json({
            message: "Email successfully sent."
          });
        });
    });

// end email try

app.use((err, req, res, next) =>{
        if(err.name == 'ValidationError'){
            var valErrors =[];
           Object.keys(err.errors).forEach(Key  => valErrors.push(err.errors[Key].message));
           res.status(422).send(valErrors)    
        }
    });

app.listen(3000, () => console.log('Server started...'));
