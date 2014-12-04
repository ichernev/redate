import {
    NativeDateStorage
} from '../../src/date-storage/native';
import { setup } from '../setup';

setup();

describe("native-date-storage", function() {
    describe("fromUnits", function () {
        it("works when all units are passed", function() {
            var d = new NativeDateStorage.fromUnits(2000, 0, 1, 0, 1, 2, 3);
            d.getMilliseconds().should.equal(3);
            d.getSeconds().should.equal(2);
            d.getMinutes().should.equal(1);
            d.getHours().should.equal(0);
            d.getDate().should.equal(1);
            d.getMonth().should.equal(0);
            d.getYear().should.equal(2000);
        });
    });

    describe("setters", function () {
        it("stores given values", function () {
            var d = new NativeDateStorage.fromUnits(2000, 0, 1, 0, 0, 0, 0);
            d.setMilliseconds(5);
            d.getMilliseconds().should.equal(5);
            d.setSeconds(6);
            d.getSeconds().should.equal(6);
            d.setMinutes(7);
            d.getMinutes().should.equal(7);
            d.setHours(8);
            d.getHours().should.equal(8);
            d.setDate(9);
            d.getDate().should.equal(9);
            d.setMonth(10);
            d.getMonth(10).should.equal(10);
            d.setYear(2015);
            d.getYear(2015).should.equal(2015);
        });
    });
});

