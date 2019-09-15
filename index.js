const http = require('http');
const express = require('express');
const app = express();

//--------------------------------------------------------------

var NotifyFcm = require('./NotifyFcm');

//--------------------------------------------------------------

app.post('/sendFcm', (req, res) => {
    
    NotifyFcm.notifyFcm({
        usertype: 1,
        device_type: 1,
        notification: "this is test Notification",
        message: {
            a: 3,
            msg: 'this is message',
            st: parseInt(1)
        },
        push_token: "this is device push token"
    });
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end({err: 0, data: 'success'});
});


app.post('/sendFcmToTopic', (req, res) => {
 
    NotifyFcm.notifyFcmTopic({
        usertype: 2,
        device_type: 1,
        notification: 'this is test Notification',
        message: {
            a: 3,
            name: 'Laxman Tukadiya',
            mobile: '8050093155',
            msg: 'this is message',
            st: parseInt(1)
        },
        push_token: "this is device push token"
    });

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end({err: 0, data: 'success'});
});

//--------------------------------------------------------------

http.createServer(app).listen(1234, () => {
    console.log('server listening on port 1234');
});
