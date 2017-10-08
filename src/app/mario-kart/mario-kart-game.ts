import {EGYM_COMMANDS} from '../egym-adapter/EGymCommands';
import {EGymMessage} from '../egym-adapter/EGymMessage';
import {ContinuityHandlerConfig, createContinuityHandler} from '../egym-adapter/message-handlers/continuity-handler';
import {GameController, GameControllerCommands} from '../game-controller/GameController';
import {EgymEventDispatcher} from '../egym-adapter/egym-dispatcher';
import {createThreeStepHandler} from '../egym-adapter/message-handlers/three-step-handler';
import {speedConfig, steeringConfig} from './mario-kart-configs';

export interface MarioKartPlayers {
 speed: string;
 steer: string;
}

export const startMarioKartGame = (eGymDispatcher: EgymEventDispatcher, controller: GameController, players: MarioKartPlayers) => {
  const createSpeedListener = () => {
	const handler = createContinuityHandler(controller, speedConfig);
	return (message: EGymMessage) => {
	  if (message.body.rfid ===players.speed && message.command === EGYM_COMMANDS.POSITION) {
		const {position} = message.body.payload;
		handler(position);
	  }
	};
  };

  const createThreeStepListener = () => {
	const handler = createThreeStepHandler(controller, steeringConfig);
	return (message: EGymMessage) => {
	  if (message.body.rfid === players.steer && message.command === EGYM_COMMANDS.POSITION) {
		const {position} = message.body.payload;
		handler(position);
	  }
	};
  };

  eGymDispatcher.registerListener(createThreeStepListener());
  eGymDispatcher.registerListener(createSpeedListener());
};