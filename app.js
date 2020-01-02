// const Config = require('./config/config');
// const db = require('./models/db');
//  require('./config/passportConfig');

// const express = require('express');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const usrRoute = require('./route/index.router');
// const nodemailer = require('nodemailer');
// const cors = require("cors")
// var app = express();
// var crypto = require('crypto');

// app.use(bodyParser.json());
// app.use(cors());
// app.use('/api',usrRoute);
// app.use(passport.initialize());

// app.use((err, req, res, next) =>{
//     if(err.name == 'ValidationError'){
//         var valErrors =[];
//        Object.keys(err.errors).forEach(Key  => valErrors.push(err.errors[Key].message));
//        res.status(422).send(valErrors)    
//     }
// });


// app.listen(process.env.PORT,() =>console.log(`app is running on port: ${process.env.PORT}`));

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
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




app.use(bodyParser.json());
app.use(cors());
app.use('/api',usrRoute);

app.use('/file-upload',(req, res) =>{
    console.log('time is running');
    res.send('delta123');
})
app.use(passport.initialize());

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) =>{
        if(err.name == 'ValidationError'){
            var valErrors =[];
           Object.keys(err.errors).forEach(Key  => valErrors.push(err.errors[Key].message));
           res.status(422).send(valErrors)    
        }
    });

// app.get('/', (req, res) => {
//   res.render('contact');
// });

// app.post('/send', (req, res) => {
//   const output = `
//     <p>You have a new contact request</p>
//     <h3>Contact Details</h3>
//     <ul>  
//       <li>Name: ${req.body.name}</li>
//       <li>Company: ${req.body.company}</li>
//       <li>Email: ${req.body.email}</li>
//       <li>Phone: ${req.body.phone}</li>
//     </ul>
//     <h3>Message</h3>
//     <p>${req.body.message}</p>
//   `;

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'mail.YOURDOMAIN.com',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'YOUREMAIL', // generated ethereal user
//         pass: 'YOURPASSWORD'  // generated ethereal password
//     },
//     tls:{
//       rejectUnauthorized:false
//     }
//   });

//   // setup email data with unicode symbols
//   let mailOptions = {
//       from: '"Nodemailer Contact" <your@email.com>', // sender address
//       to: 'RECEIVEREMAILS', // list of receivers
//       subject: 'Node Contact Request', // Subject line
//       text: 'Hello world?', // plain text body
//       html: output // html body
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//           return console.log(error);
//       }
//       console.log('Message sent: %s', info.messageId);   
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//       res.render('contact', {msg:'Email has been sent'});
//   });
//   });

app.listen(3000, () => console.log('Server started...'));
