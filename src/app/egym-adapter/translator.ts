import {createKeyboardController} from '../keyboard-mapper/KeyboardGameController';
import {GameControllerCommands} from '../mario-kart-controller/Controller';
import {EGymMessage, EGymMessagePayload} from './EGymMessage';
import {EGYM_COMMANDS} from './EGymCommands';


const controller = createKeyboardController();
// const controller: GameController = {
//   execute: (command: GameControllerCommands) => {
//     console.log(`Command was: ${command}`);
//   }
// };
controller.execute(GameControllerCommands.FORWARD);
export const translate = (input: EGymMessage) => {
  	if(input.command ===  EGYM_COMMANDS.POSITION) {
	  changePosition(input.body.payload);
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