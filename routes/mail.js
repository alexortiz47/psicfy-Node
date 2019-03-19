var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ortizalex.47@gmail.com',
           pass: '$mnfee7ymdfeeb$_GL71'
       }
   });

// http://localhost:3000/mail
router.post('/', (req, res) => {
    console.log(req.body)
    const mailOptions = {
        from: req.body.email, // sender address
        to: 'ortizalex.47@gmail.com', // list of receivers
        subject: `Email de ${req.body.nombre}`, // Subject line
        html: `<strong>Email de contacto:</strong> ${req.body.email}<br>
        <strong>Mensaje:</strong> ${req.body.asunto}`// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          console.log(err)
          res.json('El email no ha sido enviado, ha ocurrido un error')
        }
        else{
          console.log(info);
          res.json('El email ha sido enviado correctamente')
        }
     });
})

module.exports = router;


module.exports = router;