import {
    findInvalidUnit
} from '../../src/raw-date/find-invalid-unit';
import { setup } from '../setup';

setup();

describe("findInvalidUnit", function () {
    it("works if only some units are passed", function () {
        findInvalidUnit().should.equal(-1);
        findInvalidUnit(2000).should.equal(-1);
        findInvalidUnit(2000, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0, 0, 0).should.equal(-1);
    });

    it.skip("detects null values in between", function () {
        findInvalidUnit(null, null).should.equal(-1);
        findInvalidUnit(2000, null).should.equal(-1);
        findInvalidUnit(2000, null, 1).should.equal(1);
        findInvalidUnit(2000, null, 1, 0).should.equal(1);
        findInvalidUnit(2000, 0, null, 0).should.equal(2);
    });

    it("detects non-integer values", function () {
        findInvalidUnit("2000").should.equal(0);
        findInvalidUnit(2000, []).should.equal(1);
        findInvalidUnit(2000, {}).should.equal(1);
        findInvalidUnit(2000, 1.5).should.equal(1);
        findInvalidUnit(2000, '1').should.equal(1);
        findInvalidUnit(2000, false).should.equal(1);
        findInvalidUnit(2000, 0, '1').should.equal(2);
        findInvalidUnit(2000, 0, 1, '0').should.equal(3);
        findInvalidUnit(2000, 0, 1, 0, '0').should.equal(4);
        findInvalidUnit(2000, 0, 1, 0, 0, '0').should.equal(5);
        findInvalidUnit(2000, 0, 1, 0, 0, 0, '0').should.equal(6);
    });

    it("detects overflows", function () {
        findInvalidUnit(-200000).should.equal(-1);
        findInvalidUnit(200000).should.equal(-1);

        findInvalidUnit(2000, -1).should.equal(1);
        findInvalidUnit(2000, 0).should.equal(-1);
        findInvalidUnit(2000, 11).should.equal(-1);
        findInvalidUnit(2000, 12).should.equal(1);

        findInvalidUnit(2000, 0, 0).should.equal(2);
        findInvalidUnit(2000, 0, 1).should.equal(-1);
        findInvalidUnit(2000, 0, 31).should.equal(-1);
        findInvalidUnit(2000, 0, 32).should.equal(2);

        findInvalidUnit(2000, 0, 1, -1).should.equal(3);
        findInvalidUnit(2000, 0, 1, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 23).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 24).should.equal(3);

        findInvalidUnit(2000, 0, 1, 0, -1).should.equal(4);
        findInvalidUnit(2000, 0, 1, 0, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 59).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 60).should.equal(4);

        findInvalidUnit(2000, 0, 1, 0, 0, -1).should.equal(5);
        findInvalidUnit(2000, 0, 1, 0, 0, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0, 59).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0, 60).should.equal(5);

        findInvalidUnit(2000, 0, 1, 0, 0, 0, -1).should.equal(6);
        findInvalidUnit(2000, 0, 1, 0, 0, 0, 0).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0, 0, 999).should.equal(-1);
        findInvalidUnit(2000, 0, 1, 0, 0, 0, 1000).should.equal(6);
    });

    it("detects day-of-month overflow edge cases", function () {
        findInvalidUnit(2000, 0, 32).should.equal(2);
        findInvalidUnit(2000, 1, 30).should.equal(2);
        findInvalidUnit(2000, 2, 32).should.equal(2);
        findInvalidUnit(2000, 3, 31).should.equal(2);
        findInvalidUnit(2000, 4, 32).should.equal(2);
        findInvalidUnit(2000, 5, 31).should.equal(2);
        findInvalidUnit(2000, 6, 32).should.equal(2);
        findInvalidUnit(2000, 7, 32).should.equal(2);
        findInvalidUnit(2000, 8, 31).should.equal(2);
        findInvalidUnit(2000, 9, 32).should.equal(2);
        findInvalidUnit(2000, 10, 31).should.equal(2);
        findInvalidUnit(2000, 11, 32).should.equal(2);

        findInvalidUnit(2004, 0, 32).should.equal(2);
        findInvalidUnit(2004, 1, 30).should.equal(2);
        findInvalidUnit(2004, 2, 32).should.equal(2);
        findInvalidUnit(2004, 3, 31).should.equal(2);
        findInvalidUnit(2004, 4, 32).should.equal(2);
        findInvalidUnit(2004, 5, 31).should.equal(2);
        findInvalidUnit(2004, 6, 32).should.equal(2);
        findInvalidUnit(2004, 7, 32).should.equal(2);
        findInvalidUnit(2004, 8, 31).should.equal(2);
        findInvalidUnit(2004, 9, 32).should.equal(2);
        findInvalidUnit(2004, 10, 31).should.equal(2);
        findInvalidUnit(2004, 11, 32).should.equal(2);

        findInvalidUnit(2001, 0, 32).should.equal(2);
        findInvalidUnit(2001, 1, 29).should.equal(2);
        findInvalidUnit(2001, 2, 32).should.equal(2);
        findInvalidUnit(2001, 3, 31).should.equal(2);
        findInvalidUnit(2001, 4, 32).should.equal(2);
        findInvalidUnit(2001, 5, 31).should.equal(2);
        findInvalidUnit(2001, 6, 32).should.equal(2);
        findInvalidUnit(2001, 7, 32).should.equal(2);
        findInvalidUnit(2001, 8, 31).should.equal(2);
        findInvalidUnit(2001, 9, 32).should.equal(2);
        findInvalidUnit(2001, 10, 31).should.equal(2);
        findInvalidUnit(2001, 11, 32).should.equal(2);

        findInvalidUnit(2100, 0, 32).should.equal(2);
        findInvalidUnit(2100, 1, 29).should.equal(2);
        findInvalidUnit(2100, 2, 32).should.equal(2);
        findInvalidUnit(2100, 3, 31).should.equal(2);
        findInvalidUnit(2100, 4, 32).should.equal(2);
        findInvalidUnit(2100, 5, 31).should.equal(2);
        findInvalidUnit(2100, 6, 32).should.equal(2);
        findInvalidUnit(2100, 7, 32).should.equal(2);
        findInvalidUnit(2100, 8, 31).should.equal(2);
        findInvalidUnit(2100, 9, 32).should.equal(2);
        findInvalidUnit(2100, 10, 31).should.equal(2);
        findInvalidUnit(2100, 11, 32).should.equal(2);
    });
});
