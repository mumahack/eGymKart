import {keyToggle} from 'robotjs';
import {GameController, GameControllerCommands} from '../game-controller/GameController';


const createKeyUpEvent = (key) => () => keyToggle(key, 'up');
const createKeyPressedEvent = (key) => () => keyToggle(key, 'down');

const leftUp = createKeyUpEvent('left');
const rightUp = createKeyUpEvent('right');


const commandMap = {
  [GameControllerCommands.CENTER]: () => {
	leftUp();
	rightUp();
  },
  [GameControllerCommands.LEFT]: createKeyPressedEvent('left'),
  [GameControllerCommands.RIGHT]: createKeyPressedEvent('right'),
  [GameControllerCommands.A_BUTTON]: createKeyPressedEvent('e'),
  [GameControllerCommands.A_BUTTON_RELEASE]: createKeyUpEvent('e')
};

export const createKeyboardController = (): GameController => {
  return {
	execute: (command) => {
	  commandMap[command]();
	}
  }
};

