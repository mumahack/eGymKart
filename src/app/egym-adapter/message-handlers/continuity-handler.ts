import {GameController, GameControllerCommands} from '../../game-controller/GameController';
import {always, cond, T} from 'ramda';
import {ThresholdConfig} from './Configs';

export interface ContinuityHandlerConfig {
  thresholds: ThresholdConfig,
  commands: { startMove: GameControllerCommands, endMove: GameControllerCommands },
  timeToStop: number;
}

export const createContinuityHandler = (controller: GameController, config: ContinuityHandlerConfig) => {
  const state = {
	isMoving: false,
	lastPos: 'center',
	timeout: null
  };

  const isUp = position => position < config.thresholds.min;
  const isDown = position => position > config.thresholds.max;
  const getCurrentPos = cond([
	[isUp, always('up')],
	[isDown, always('down')],
	[T, always('center')]
  ]);
  const isOppositeMoveFrom = (move: string, position: number) => move === 'up' ? isDown(position) : isUp(position);
  const getOppositeMove = (move: string) => move === 'up' ? 'down' : 'up';

  const refreshStopTimeout = () => {
	if (state.timeout) {
	  clearTimeout(state.timeout);
	}
	state.timeout = setTimeout(() => {
	  state.isMoving = false;
	  controller.execute(config.commands.endMove);
	},config.timeToStop)
  };

  const startMovement = () => {
	state.isMoving = true;
	state.lastPos = 'up';
	controller.execute(config.commands.startMove);
  };

  return (position: number) => {
	if (!state.isMoving) {
	  const positionString = getCurrentPos(position);
	  if (positionString === 'up' || positionString === 'down') {
		if (state.lastPos !== 'center' && getOppositeMove(state.lastPos) === positionString) {
		  startMovement();
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

