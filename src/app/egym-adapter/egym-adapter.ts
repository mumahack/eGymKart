import {translate} from "./translator";

var url = "tcp://35.195.199.160:5556";

var zmq = require('zeromq')
    , sock = zmq.socket('sub');

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected');

sock.on('message', function (e) {
    e = e.toString("utf8");
    let message = splitData(e);

    translate(message);
});

function splitData(data) {
    return {
        'command': data.substr(0, data.indexOf(" ")),
        'object': JSON.parse(data.substr(data.indexOf(" ")))
    };
}