import * as zmq from 'zeromq';
import {EGymMessage} from './EGymMessage';
import {parseMessage} from './message-parser';

const url = "tcp://35.195.199.160:5556";

const sock = zmq.socket('sub');
sock.connect(url);
sock.subscribe('', () => {
  console.log('Subscriber connected');
});
export const registerEGymHubListener = (listener) => {
  sock.on('message', (e) => {
	e = e.toString("utf8");
	const message: EGymMessage = parseMessage(e);
	listener.update(message);
  });
};

