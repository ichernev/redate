import {
    RawDate
} from '../../src/raw-date/raw-date';
import {
    NativeDateStorage
} from '../../src/date-storage/native';
import { setup } from '../setup';

setup();

describe("raw-date-options", function () {
    beforeEach(function () {
        RawDate.resetDefault();
    });

    afterEach(function () {
        RawDate.resetDefault();
    });

    describe("getDefaults", function () {
        it("returns the object with all the default options", function () {
            RawDate.getDefaults().should.deep.equal({
                storage: NativeDateStorage
            });
        });
    });

    describe("setDefaults", function () {
        it("changes the defaults, so getDefaults returns the new ones", function () {
            RawDate.setDefaults({storage: 5});
            RawDate.getDefaults().should.deep.equal({
                storage: 5
            });
        });
    });
});
