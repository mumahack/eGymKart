var url = "tcp://35.195.199.160:5556";

var zmq = require('zeromq')
    , sock = zmq.socket('sub');

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected to port 3000');

sock.on('message', function(topic, message) {
    console.log('received a message related to:', topic, 'containing message:', message);
});