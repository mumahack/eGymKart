import {translate} from "./translator";
import {EGymMessage} from './EGymMessage';

const OUR_CHIP = ''
var url = "tcp://35.195.199.160:5556";

var zmq = require('zeromq')
  , sock = zmq.socket('sub');

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected');

const filterCommands = [
  'training_weight_data',
  'training_position_data'
];


sock.on('message', function (e) {
  e = e.toString("utf8");
  const message: EGymMessage = splitData(e);
  if (isPlayer(message.object.rfid)) translate(message);
});

function splitData(data) {
  return {
	'command': data.substr(0, data.indexOf(" ")),
	'object': JSON.parse(data.substr(data.indexOf(" ")))
  };
}

let playerIDs = ['14d6ee20', '2e503f45'];

function isPlayer(rfid) {
  return playerIDs.find((id) => rfid === id);
}

