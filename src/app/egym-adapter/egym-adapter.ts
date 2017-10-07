var url = "tcp://35.195.199.160:5556";

var zmq = require('zeromq')
    , sock = zmq.socket('sub');

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected to port 3000');

var position = 0;
sock.on('message', function(e) {

    // console.log("Received:", JSON.parse(e));

    e = e.toString("utf8");
    console.log("utf8:", (e));

    let message = splitData(e);

    console.log(message)
    //
    // console.log("Data Received: " + e.data);
    // var message = splitData(e.data);
    // switch (message.command) {
    //     case "training_position_data":
    //         position = message.object.payload.position;
    //         break;
    // }
});

function splitData(data) {
    return {
        'command': data.substr(0, data.indexOf(" ")),
        'object': JSON.parse(data.substr(data.indexOf(" ")))
    };
}