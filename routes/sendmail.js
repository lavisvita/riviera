var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'lavisvita@yandex.ru',
        pass: 'GfHjKm2016'
    },
    tls: {
        rejectUnauthorized: false
    }
});

router.post('/sendmail', function(req, res, next) {
    var senderEmail = '';
    var variant = req.body.variant;
    var senderName = req.body.senderName;
    var senderPhone = req.body.senderPhone;
    if(req.body.senderEmail == undefined) senderEmail = '';
    else senderEmail = req.body.senderEmail;
    var options = {
        from: 'lavisvita@yandex.ru',
        to: 'lavisvita@yandex.ru', // адрес Ривьеры
        subject: 'Заявка с сайта "Ривьера"',
        html: '<div><strong>Вариант оплаты: </strong>' + variant + '</div><div><strong>Имя: </strong>' + senderName + '</div><div><strong>Номер телефона: </strong>' +senderPhone + '</div>' + '</div><div><strong>Email: </strong>' +senderEmail + '</div>'
    };

    transporter.sendMail(options, function(err, info) {
        if (err) {
            console.log(err);
            return err;
        }
        return console.log("Сообщение отправлено: " + info.response);
        transporter.close();
    });
});


module.exports = router;