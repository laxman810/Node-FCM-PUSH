var config = require('./config.json');

var FCM = require('fcm-push');

module.exports.notifyFcm = function (request) {

    if (parseInt(request.usertype) == 1) {
        if (request.device_type == 1) {
            fcm_server_key = config.FCM_SERVER_KEY_MASTER_IOS;
        } else {
            fcm_server_key = config.FCM_SERVER_KEY_MASTER_ANDROID;
        }
    } else {
        if (request.device_type == 1) {
            fcm_server_key = config.FCM_SERVER_KEY_SLAVE_IOS;
        } else {
            fcm_server_key = config.FCM_SERVER_KEY_SLAVE_ANDROID;
        }
    }

    var fcm = new FCM(fcm_server_key);

    var message = {
        to: request.push_token, // required fill with device token or topics
        collapse_key: 'your_collapse_key',
        priority: 'high',
        "delay_while_idle": true,
        "dry_run": false,
        "time_to_live": 3600,
        "content_available": true,
        badge: "1",
        data: request.message
    };

    message.notification = {
        title: request.notification,
        body: request.notification,
        sound: "default"
    };


    fcm.send(message)
        .then(function (response) {
        })
        .catch(function (err) {
            console.error(err);
        })
}

module.exports.notifyFcmTopic = function (request, callback) {

    let fcm_server_key = '';

    if (parseInt(request.usertype) == 1) {
        if (request.device_type == 1) {
            fcm_server_key = config.FCM_SERVER_KEY_MASTER_IOS;
        } else {
            fcm_server_key = config.FCM_SERVER_KEY_MASTER_ANDROID;
        }
    } else {
        if (request.device_type == 1) {
            fcm_server_key = config.FCM_SERVER_KEY_SLAVE_IOS;
        } else {
            fcm_server_key = config.FCM_SERVER_KEY_SLAVE_ANDROID;
        }
    }

    var fcm = new FCM(fcm_server_key);

    var message = {
        to: '/topics/' + request.push_token, // required fill with device token or topics
        collapse_key: 'your_collapse_key',
        priority: 'high',
        "delay_while_idle": true,
        "dry_run": false,
        "time_to_live": 3600,
        "content_available": true,
        badge: "1",
        data: request.message
    };
    message.notification = {
        title: request.notification,
        body: request.notification,
        sound: "default"
    };
    fcm.send(message)
        .then(function (response) {
            return 1;
        })
        .catch(function (err) {
            console.error(err);
            return 0;
        });

    return;
}