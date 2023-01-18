var express = require("express")
let bodyParser = require('body-parser')
var FirebaseAdmin = require("firebase-admin");
var serviceAccount = require("./carga-colombiana-firebase-adminsdk-lodi1-01819c765b.json");
const {getMessaging} = require("firebase-admin/messaging");
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(serviceAccount)
});


app.post("/sendNotification",async function (req, res)
{
    //console.log(req.body)


    try {
        var devices = req.body.tokenDevices
        await FirebaseAdmin.messaging().sendToDevice(devices,{
            notification: {
                title: 'SERVIDOR',
                body: 'NOTIFICACION DESDE SERVIDOR',
                sound: 'default',
                badge: '1',
            }
        })
        res.status(200).json({
            msm:"NOTIFIACION ENVIADA"
        })

    }catch (e) {
        res.status(200).json({
            msm: e.toString()
        })
    }
})

app.listen(3000,()=>{
    console.log("SERVER LISTEN PORT 3000")
})