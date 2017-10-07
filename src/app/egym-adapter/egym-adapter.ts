import {contains} from 'ramda';

import {translate} from "./translator";
import {EGymMessage} from './EGymMessage';
import {parseMessage} from './message-parser';

const url = "tcp://35.195.199.160:5556";

const zmq = require('zeromq')
const sock = zmq.socket('sub');

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected');

sock.on('message', (e) => {
  e = e.toString("utf8");
  const message: EGymMessage = parseMessage(e);
  if (isPlayer(message.body.rfid)) translate(message);
});


const playerIDs = ['14d6ee20', '2e503f45'];
const isPlayer = (rfid) => playerIDs.find((id) => rfid === id);

