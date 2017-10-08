// MARIO KART SPECIFIC CODE
import {createKeyboardController} from './app/keyboard-controller/KeyboardGameController';
import {createSteeringHandler} from './app/egym-adapter/message-handlers/steering-handler';
import {EGymMessage} from './app/egym-adapter/EGymMessage';
import {EGYM_COMMANDS} from './app/egym-adapter/EGymCommands';
import {createSpeedHandler} from './app/egym-adapter/message-handlers/speed-handler';
import {createEGymEventDispatcher} from './app/egym-adapter/egym-dispatcher';

const PLAYERS = {
  PAULINA: '2e503f45',
  TIMO: '14d6ee20'
};

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
	if (message.body.rfid === PLAYERS.PAULINA && message.command === EGYM_COMMANDS.POSITION) {
	  const {position} = message.body.payload;
	  console.log(`Handling position: ${position}`);
	  handler(position);
	}
  };
};


eGymDispatcher.registerListener(createSteeringListener);
eGymDispatcher.registerListener(createSpeedListener());
