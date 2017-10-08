import {EGymMessage} from './EGymMessage';
import {EGYM_COMMANDS} from './EGymCommands';
import {createKeyboardController} from '../keyboard-mapper/KeyboardGameController';
import {createSpeedHandler} from './speed-handler';
import {createSteeringHandler} from './steering-handler';
import {registerEGymHubListener} from './egym-connector';

const PLAYERS = {
  PAULINA: '2e503f45',
  TIMO: '14d6ee20'
};

export type EGymEventListener = (message: EGymMessage) => void;

export interface EgymEventDispatcher {
  registerListener: (listener: EGymEventListener) => void;
  update: (message: EGymMessage) => void;
}

const createEGymEventDispatcher = (): EgymEventDispatcher => {
  const listeners = [];
  const eGymEventDispatcher = {
	registerListener: (listener: EGymEventListener) => {
	  listeners.push(listener);
	},
	update: (message: EGymMessage) => {
	  if(isPlayer(message.body.rfid)) listeners.forEach(listener => listener(message));
	}
  };
  registerEGymHubListener(eGymEventDispatcher)
  return eGymEventDispatcher;
};
// *********************************************************************
// MARIO KART SPECIFIC CODE
const controller = createKeyboardController();
export const eGymDispatcher = createEGymEventDispatcher();
const createSteeringListener = () => {
  const handler = createSteeringHandler(controller);
  return (message: EGymMessage) => {
	if (message.body.rfid === PLAYERS.PAULINA && message.command === EGYM_COMMANDS.POSITION) {
	  const {position} = message.body.payload;
	  handler(position);
	}
  };
};

// *********************************************************************
const createSpeedListener = () => {
  const handler = createSpeedHandler(controller);
  return (message: EGymMessage) => {
	if (message.body.rfid === PLAYERS.TIMO && message.command === EGYM_COMMANDS.POSITION) {
	  const {position} = message.body.payload;
	  handler(position);
	}
  };
};
// *********************************************************************

eGymDispatcher.registerListener(createSteeringListener);
eGymDispatcher.registerListener(createSpeedListener());


const playerIDs = ['14d6ee20', '2e503f45'];
const isPlayer = (rfid) => playerIDs.find((id) => rfid === id);

