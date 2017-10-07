import {expect} from 'chai';
import {test} from './egym-adapter';
import {EGymMessage} from './EGymMessage';
import {parseMessage} from "./message-parser";

describe('egym-adapter', () => {
    it('reactToFrequentInputs', () => {
        expect(true).to.be.true;
        expect('test').to.equal('test');
        let data = {
            "timestamp": 1507283268.229425,
            "rfid": "0x1234567",
            "machine_id": 4567,
            "payload": {
                "position": 0.75
            },
            "machine_type": "M18"
        };

        const message: EGymMessage = parseMessage(data);

        for (let i = 1; i <= 100; i++) {
            test()(message);
        }
    });
});