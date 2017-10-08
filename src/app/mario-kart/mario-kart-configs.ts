import {ThreeStepHandlerConfig} from '../egym-adapter/message-handlers/three-step-handler';
import {GameControllerCommands} from '../game-controller/GameController';
import {ContinuityHandlerConfig} from '../egym-adapter/message-handlers/continuity-handler';

export const steeringConfig: ThreeStepHandlerConfig = {
  thresholds: {min: 0.3, max: 0.6},
  commands: {
	low: GameControllerCommands.LEFT,
	middle: GameControllerCommands.CENTER,
	high: GameControllerCommands.RIGHT
  }
};

export const speedConfig: ContinuityHandlerConfig = {
  thresholds: {min: 0.2, max: 0.8},
  commands: {startMove: GameControllerCommands.A_BUTTON, endMove: GameControllerCommands.A_BUTTON_RELEASE},
  timeToStop: 1000
};
