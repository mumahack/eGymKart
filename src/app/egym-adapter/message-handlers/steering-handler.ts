import {GameController, GameControllerCommands} from '../../game-controller/GameController';

export const createSteeringHandler = (controller: GameController) =>
  (position: number) => {
	if(position < 0.2) {
	  controller.execute(GameControllerCommands.LEFT);
	} else if(position < 0.8) {
	  controller.execute(GameControllerCommands.CENTER);
	} else {
	  controller.execute(GameControllerCommands.RIGHT);
	}
  };