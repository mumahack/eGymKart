var url = "tcp://35.195.199.160:5556";

var zmq = require('zeromq')
    , sock = zmq.socket('sub');

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected');

sock.on('message', function(e) {
    e = e.toString("utf8");
    e = splitData(e);
    console.log("Data Received: " + e);

    var message = splitData(e.data);
    switch (message.command) {
        case "training_position_data":
            break;
    }
});

function splitData(data) {
    return {
        'command': data.substr(0, data.indexOf(" ")),
        'object': JSON.parse(data.substr(data.indexOf(" ")))
    };
}