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
const internalState = {wasUp: true, timer: new Date(), isRunning: false};
function timeOver(timer: Date) {
    let now = new Date();
    const rsult = now.getMilliseconds()-timer.getMilliseconds();
    console.log('Result: ' + rsult);

    return  rsult > 1000;
}
let currentTimeout;
const WAIT_TIME = 1000;
const isUp = position => position < 0.2;
const isDown = position => position > 0.8;
let timeout;
const createStopTimeout = () => {
    timeout = setTimeout(() => {
        console.log('STAAAAAHP');
        internalState.isRunning = false;
        return controller.execute(GameControllerCommands.STOP);
    }, WAIT_TIME);
};

export function determineMovement(position: number) {
    if(!internalState.isRunning && isDown(position)) {
        console.log('INIT');
        controller.execute(GameControllerCommands.FORWARD);
        internalState.wasUp = false;
        internalState.isRunning = true;
    } else if(isUp(position) && !internalState.wasUp) {
        console.log('UP');
        internalState.wasUp = true;
        clearTimeout(timeout);

    } else if(isDown(position) && internalState.wasUp) {
        console.log('DOWN');
        internalState.wasUp = false;
        clearTimeout(timeout);
    }

    if(internalState.isRunning && !timeout) {
            createStopTimeout();
    }


    //
    //
    // console.log(`Position: ${position}`);
    // if (timeOver(internalState.timer)) {
    //     console.log(internalState.timer)
    //     controller.execute(GameControllerCommands.STOP);
    //     internalState.timer = new Date();
    // } else {
    //     if (position < 0.4 && internalState.wasUp) {
    //         controller.execute(GameControllerCommands.FORWARD);
    //         internalState.wasUp = true;
    //         internalState.timer = new Date();
    //     } else if (position > 0.6 && !internalState.wasUp) {
    //         controller.execute(GameControllerCommands.FORWARD);
    //         internalState.wasUp = false;
    //         internalState.timer = new Date();
    //     }
    // }
}

const createSpeedListener = () => {
    return (message: EGymMessage) => {
	if (message.body.rfid === PLAYERS.TIMO && message.command === EGYM_COMMANDS.POSITION) {
	  const {position} = message.body.payload;
	  determineMovement(position);
	}
  };
};
export const test = createSpeedListener;
// *********************************************************************

// eGymDispatcher.registerListener(steeringListener);
eGymDispatcher.registerListener(createSpeedListener());

sock.connect(url);
sock.subscribe('');
console.log('Subscriber connected');

sock.on('message', (e) => {
  e = e.toString("utf8");
  const message: EGymMessage = parseMessage(e);
  if (isPlayer(message.body.rfid)) {
	createSpeedListener()(message);
  }
});

export type EGymEventListener = (message: EGymMessage) => void;

export interface EgymEventDispatcher {
  registerListener: (listener: EGymEventListener) => void;
  update: (message: EGymMessage) => void;
}

const playerIDs = ['14d6ee20', '2e503f45'];
const isPlayer = (rfid) => playerIDs.find((id) => rfid === id);

