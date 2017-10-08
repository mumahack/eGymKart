import {expect} from 'chai';
import {createSpeedHandler} from './speed-handler';
import * as sinon from 'sinon';
import {GameController, GameControllerCommands} from '../game-controller/GameController';

describe('SpeedHandler', () => {
  let controllerMock: GameController;
  let handler;
  beforeEach(() => {
	controllerMock = {
	  execute: sinon.spy()
	};
	handler = createSpeedHandler(controllerMock);
  });
  it('starts as soon as the player goes up', () => {
	handler(0);
	expect(controllerMock.execute).to.have.been.calledWith(GameControllerCommands.FORWARD);
  });
  it('stops after a second as soon as the player stops moving', (done) => {
	handler(0);

	setTimeout(() => {
	  expect(controllerMock.execute).to.have.been.calledWith(GameControllerCommands.STOP);
	  done();
	}, 1100);
  });


  const sendUp = () => handler(0);
  const sendDown = () => handler(1);
  it('does not call stop while player is constantly moving up and down', (done) => {
	let state = 'up';
	const interval = setInterval(() => {
	  if (state === 'up') {
		state = 'down';
		sendDown();
	  } else {
		state = 'up';
		sendUp();
	  }
	}, 500);

	setTimeout(() => {
	  clearInterval(interval);
	  expect(controllerMock.execute).not.to.have.been.calledWith(GameControllerCommands.STOP);
	  done();
	}, 2000);
  }).timeout(3000);
});