import {GameController, GameControllerCommands} from '../game-controller/GameController';

const isUp = position => position < 0.2;
const isDown = position => position > 0.8;

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
	  controller.execute(GameControllerCommands.STOP);
	}, 1000)
  };

  const startMovement = () => {
	state.isMoving = true;
	state.lastPos = 'up';
	controller.execute(GameControllerCommands.FORWARD);
  };

  return (position: number) => {
	if (!state.isMoving && isUp(position)) {
	  startMovement();
	  refreshStopTimeout();
	} else {
	  if (isOppositeMoveFrom(state.lastPos, position)) {
		refreshStopTimeout();
		state.isMoving =true;
		state.lastPos = getOppositeMove(state.lastPos);
	  }
	}
  };
};

