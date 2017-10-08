import {GameController, GameControllerCommands} from '../game-controller/GameController';
import {cond, always, T} from 'ramda';


const isUp = position => position < 0.2;
const isDown = position => position > 0.8;
const getCurrentPos = cond([
  [isUp, always('up')],
  [isDown, always('down')],
  [T, always('center')]
]);

const isOppositeMoveFrom = (move: string, position: number) => move === 'up' ? isDown(position) : isUp(position);
const getOppositeMove = (move: string) => move === 'up' ? 'down' : 'up';
export const createSpeedHandler = (controller: GameController) => {
  const state = {
	isMoving: false,
	lastPos: 'center',
	timeout: null
  };

  const refreshStopTimeout = () => {
	if (state.timeout) {
	  clearTimeout(state.timeout);
	}
	state.timeout = setTimeout(() => {
	  state.isMoving = false;
	  console.log('STAAAAHP');
	  controller.execute(GameControllerCommands.STOP);
	}, 2000)
  };

  const startMovement = () => {
	state.isMoving = true;
	state.lastPos = 'up';
	controller.execute(GameControllerCommands.FORWARD);
  };

  return (position: number) => {
	if (!state.isMoving) {
	  const positionString = getCurrentPos(position);
	  if (positionString === 'up' || positionString === 'down') {
		if (state.lastPos !== 'center' && getOppositeMove(state.lastPos) === positionString) {
		  startMovement();
		  console.log('START!');
		  refreshStopTimeout();
		}
		state.lastPos = positionString;
	  }
	} else {
	  if (isOppositeMoveFrom(state.lastPos, position)) {
		refreshStopTimeout();
		state.isMoving = true;
		state.lastPos = getOppositeMove(state.lastPos);
	  }
	}
  };
};

