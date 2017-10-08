import {cond, lte, gte, always, T, flip} from 'ramda';

import {GameController, GameControllerCommands} from '../../game-controller/GameController';
import {ThresholdConfig} from './Configs';

export interface ThreeStepHandlerConfig {
  thresholds: ThresholdConfig,
  commands: { low: GameControllerCommands, middle: GameControllerCommands, high: GameControllerCommands }
}

export const createThreeStepHandler = (controller: GameController, config: ThreeStepHandlerConfig) => {
  const isMin = flip(lte)(config.thresholds.min);
  const isMax = flip(gte)(config.thresholds.max);
  const chooseCommandBy = cond([
    [isMin, always(config.commands.low)],
	[isMax, always(config.commands.high)],
	[T, always(config.commands.middle)]
  ]);

  return (position: number) => {
    const command = chooseCommandBy(position);
    controller.execute(command);
  }
};