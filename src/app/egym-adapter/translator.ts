import {createKeyboardController} from '../keyboard-mapper/KeyboardGameController';
import {GameController, GameControllerCommands} from '../mario-kart-controller/Controller';
import {EGymMessage, EGymMessagePayload} from './EGymMessage';

export const EGYM_COMMANDS = {
  POSITION_COMMAND: 'training_position_data'
};


const controller = createKeyboardController();
// const controller: GameController = {
//   execute: (command: GameControllerCommands) => {
//     console.log(`Command was: ${command}`);
//   }
// };
controller.execute(GameControllerCommands.FORWARD);
export const translate = (input: EGymMessage) => {
  	if(input.command ===  EGYM_COMMANDS.POSITION_COMMAND) {
	  changePosition(input.object.payload);
	}
};

const changePosition = (positionPayload: EGymMessagePayload) => {
  const {position} = positionPayload;
  if(position < 0.2) {
	controller.execute(GameControllerCommands.LEFT);
  } else if(position < 0.8) {
    controller.execute(GameControllerCommands.CENTER);
  } else {
    controller.execute(GameControllerCommands.RIGHT);
  }
};