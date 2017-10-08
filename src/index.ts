// MARIO KART SPECIFIC CODE
import {createKeyboardController} from './app/keyboard-controller/KeyboardGameController';
import {createThreeStepHandler, SteeringHandlerConfig} from './app/egym-adapter/message-handlers/three-step-handler';
import {EGymMessage} from './app/egym-adapter/EGymMessage';
import {EGYM_COMMANDS} from './app/egym-adapter/EGymCommands';
import {createContinuityHandler, SpeedHandlerConfig} from './app/egym-adapter/message-handlers/continuity-handler';
import {createEGymEventDispatcher} from './app/egym-adapter/egym-dispatcher';
import {GameControllerCommands} from './app/game-controller/GameController';

const PLAYERS = {
  PAULINA: '2e503f45',
  TIMO: '14d6ee20'
};

const controller = createKeyboardController();
export const eGymDispatcher = createEGymEventDispatcher();

const steeringConfig: SteeringHandlerConfig = {
  thresholds: {min: 0.3, max: 0.6},
  commands: {
    low: GameControllerCommands.LEFT,
	middle: GameControllerCommands.CENTER,
	high: GameControllerCommands.RIGHT
  }
};

const createSteeringListener = () => {
  const handler = createThreeStepHandler(controller, steeringConfig);
  return (message: EGymMessage) => {
	if (message.body.rfid === PLAYERS.PAULINA && message.command === EGYM_COMMANDS.POSITION) {
	  const {position} = message.body.payload;
	  handler(position);
	}
  };
};

// *********************************************************************
const speedConfig: SpeedHandlerConfig = {
  thresholds: {min: 0.2, max: 0.8},
  commands: {startMove: GameControllerCommands.FORWARD, endMove: GameControllerCommands.STOP},
  timeToStop: 1000
};

const createSpeedListener = () => {
  const handler = createContinuityHandler(controller, speedConfig);
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
