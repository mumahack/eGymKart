import {translate} from "./translator";
import {EGymMessage} from './EGymMessage';
import {parseMessage} from './message-parser';
import * as zmq from 'zeromq';
import {EGYM_COMMANDS} from './EGymCommands';
import {createKeyboardController} from '../keyboard-mapper/KeyboardGameController';
import {GameControllerCommands} from '../mario-kart-controller/Controller';

const sock = zmq.socket('sub');

const url = "tcp://35.195.199.160:5556";

const PLAYERS = {
  PAULINA: '2e503f45',
  TIMO: '14d6ee20'
};

const createEGymEventDispatcher = (): EgymEventDispatcher => {
  const listeners = [];
  return {
	registerListener: (listener: EGymEventListener) => {
	  listeners.push(listener);
	},
	update: (message: EGymMessage) => listeners.forEach(listener => listener(message))
  }
};

const controller = createKeyboardController();
// *********************************************************************
export const eGymDispatcher = createEGymEventDispatcher();
const steeringListener = (message: EGymMessage) => {
  if(message.body.rfid === PLAYERS.PAULINA && message.command === EGYM_COMMANDS.POSITION) {
	const {position} =message.body.payload;
	if(position < 0.2) {
	  controller.execute(GameControllerCommands.LEFT);
	} else if(position < 0.8) {
	  controller.execute(GameControllerCommands.CENTER);
	} else {
	  controller.execute(GameControllerCommands.RIGHT);
	}
  }
};

// *********************************************************************
const createSpeedListener = () => {
  const internalState = {};
  return (message: EGymMessage) => {
	if (message.body.rfid === PLAYERS.TIMO && message.command === EGYM_COMMANDS.POSITION) {
	  const {position} = message.body.payload;
	}
  };
};
// *********************************************************************

eGymDispatcher.registerListener(steeringListener);
eGymDispatcher.registerListener(createSpeedListener());

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected');

sock.on('message', (e) => {
  e = e.toString("utf8");
  const message: EGymMessage = parseMessage(e);
  if (isPlayer(message.body.rfid)) {
	const translatedMessage = translate(message);
  }
});

export type EGymEventListener = (message: EGymMessage) => void;

export interface EgymEventDispatcher {
  registerListener: (listener: EGymEventListener) => void;
  update: (message: EGymMessage) => void;
}

const playerIDs = ['14d6ee20', '2e503f45'];
const isPlayer = (rfid) => playerIDs.find((id) => rfid === id);

