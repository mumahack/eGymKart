// MARIO KART SPECIFIC CODE
import {createKeyboardController} from './app/keyboard-controller/KeyboardGameController';
import {createEGymEventDispatcher} from './app/egym-adapter/egym-dispatcher';
import {startMarioKartGame} from './app/mario-kart/mario-kart-game';

// Our currently known players. In a later version, this can be replaced by a dynamic input
const PLAYERS = {
  PAULINA: '2e503f45',
  TIMO: '14d6ee20'
};

const eGymDispatcher = createEGymEventDispatcher();
const controller = createKeyboardController();

startMarioKartGame(eGymDispatcher, controller, {
  speed: PLAYERS.TIMO,
  steer: PLAYERS.PAULINA
});
