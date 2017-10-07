import {expect} from 'chai';

import {parseMessage} from './message-parser';

describe('MessageParser', () => {
  it('splits on the first space and extracts command & body', () => {
	const message = 'command {"body": "test"}';
	const result = parseMessage(message);
	expect(result.command).to.equal('command');
	expect(result.body).to.eql({body: 'test'});
  });
});