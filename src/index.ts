import {keyTap, keyToggle} from 'robotjs';
import {createKeyboardController} from './app/keyboard-mapper/KeyboardGameController';
import {GameControllerCommands} from './app/mario-kart-controller/Controller';


const keyboardController = createKeyboardController();
keyboardController.execute(GameControllerCommands.FORWARD);
keyboardController.execute(GameControllerCommands.LEFT);
// const interval2 = setInterval(() => {
//   keyTap('left');
// }, 1);
setTimeout(() => {
  keyboardController.execute(GameControllerCommands.STOP);
  keyboardController.execute(GameControllerCommands.CENTER);
}, 3000);
console.log('Running!');