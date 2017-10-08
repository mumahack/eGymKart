import * as sinon from 'sinon';
import {expect} from 'chai';
import {GameController, GameControllerCommands} from '../../game-controller/GameController';
import {createSteeringHandler, SteeringHandlerConfig} from './steering-handler';

describe('SteeringHandler', () => {
  let handler;
  let controllerMock: GameController;
  const {LEFT, CENTER, RIGHT} = GameControllerCommands;

  const config: SteeringHandlerConfig = {
	thresholds: {min: 0.2, max: 0.8},
	commands: {
	  low: LEFT,
	  middle: CENTER,
	  high: RIGHT
	}
  };
  beforeEach(() => {
	controllerMock = {
	  execute: sinon.spy()
	};
	handler = createSteeringHandler(controllerMock, config)
  });


  it('steers left when on minimum', () => {
     handler(0);
     expect(controllerMock.execute).to.have.been.calledWith(LEFT);
  });
  it('steers right when on maximum', () => {

	handler(1);
	expect(controllerMock.execute).to.have.been.calledWith(RIGHT);
  });

  it('steers center when between min and max', () => {
    handler(0.5);
	expect(controllerMock.execute).to.have.been.calledWith(CENTER);
  });
});
