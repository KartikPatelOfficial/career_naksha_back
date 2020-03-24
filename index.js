const express = require('express')
const nodemailer = require('nodemailer')
var firebase = require("firebase/app");

require("firebase/firestore");
const app = express()

/****************************************************************************************
 *                        TODO: provide auth informations                               *
 * go here https://myaccount.google.com/lesssecureapps and enable for less secure apps. *
 ****************************************************************************************/
const email = ""
const password = ""

//TODO: provide email address which recive all emails
const ownerEmail = ""

//TODO: fill firebase config by creating webapp in firebase console.
var firebaseConfig = {
    
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
})

app.get('/sendmail/:uid', (req, res) => {
    db.collection('users').doc(req.params.uid).get().then((snapshot) => {
        var message = `New user signed up.\nName : ${snapshot.get('name')}\Email : ${snapshot.get('email')}\PhoneNumber : ${snapshot.get('phone')}`
        sendmail(message)
        res.send({ status: 200 })
    }).catch((e) => {
        res.send({ error: e })
    })
})

function sendmail(message) {
    let mailOptions = {
        from: email,
        to: ownerEmail,
        subject: 'New Data',
        text: message
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

app.listen(8080)