import {
    RawDate
} from '../../src/raw-date/raw-date';
import { setup } from '../setup';

setup();

describe("RawDate", function () {
    describe("year", function () {
        it("handles 29 feb to a non-leap year", function () {
            var d = RawDate.fromUnits(2000, 1, 29);

            d.setYear(2001);

            d.getYear().should.equal(2001);
            d.getMonth().should.equal(1);
            d.getDate().should.equal(28);
        });

        it("chains", function () {
            var d = RawDate.fromUnits(2000, 1, 29);

            d.setYear(2100).setYear(2001);
            d.getYear().should.equal(2001);
        });
    });

    describe("month", function () {
        it("chains", function () {
            var d = RawDate.fromUnits(2000, 1, 29);

            d.setMonth(5).setYear(2001);
            d.getYear().should.equal(2001);
            d.getMonth().should.equal(5);
            d.getDate().should.equal(29);
        });

        it("handles 29 feb + 12 months", function () {
            var d = RawDate.fromUnits(2000, 1, 29);

            d.setMonth(d.getMonth() + 12);

            d.getYear().should.equal(2001);
            d.getMonth().should.equal(1);
            d.getDate().should.equal(28);
        });

        it("handles 30th of a month to a leap February", function () {
            var d = RawDate.fromUnits(2000, 0, 30);

            d.setMonth(1);

            d.getYear().should.equal(2000);
            d.getMonth().should.equal(1);
            d.getDate().should.equal(29);
        });

        it("handles 30th of a month to a non-leap February", function () {
            var d = RawDate.fromUnits(2000, 0, 30);

            d.setMonth(13);

            d.getYear().should.equal(2001);
            d.getMonth().should.equal(1);
            d.getDate().should.equal(28);
        });

        it("handles 31th of a month to month with 30", function () {
            var d = RawDate.fromUnits(2000, 0, 31);

            d.setMonth(3);

            d.getYear().should.equal(2000);
            d.getMonth().should.equal(3);
            d.getDate().should.equal(30);
        });

        it("handles overflow", function () {
            var d = RawDate.fromUnits(2000, 4, 5);

            // Apr, next year
            d.setMonth(15);
            d.getYear().should.equal(2001);
            d.getMonth().should.equal(3);
            d.getDate().should.equal(5);

            // Jan, next year
            d.setMonth(12);
            d.getYear().should.equal(2002);
            d.getMonth().should.equal(0);
            d.getDate().should.equal(5);

            // Dec, last year
            d.setMonth(-1);
            d.getYear().should.equal(2001);
            d.getMonth().should.equal(11);
            d.getDate().should.equal(5);

            // Jan, last year
            d.setMonth(-12);
            d.getYear().should.equal(2000);
            d.getMonth().should.equal(0);
            d.getDate().should.equal(5);

            // Dec, 2 years ago
            d.setMonth(-13);
            d.getYear().should.equal(1998);
            d.getMonth().should.equal(11);
            d.getDate().should.equal(5);
        });
    });

    describe("date", function () {
        it("chains", function () {
            var d = RawDate.fromUnits(2000, 4, 5);
            d.setDate(7).setMonth(8);

            d.getYear().should.equal(2000);
            d.getMonth().should.equal(8);
            d.getDate().should.equal(7);
        });

        it("handles in-month date setting", function () {
            var d = RawDate.fromUnits(2000, 4, 5);

            d.setDate(7);
            d.getYear().should.equal(2000);
            d.getMonth().should.equal(4);
            d.getDate().should.equal(7);

            d.setDate(1);
            d.getYear().should.equal(2000);
            d.getMonth().should.equal(4);
            d.getDate().should.equal(1);

            d.setDate(31);
            d.getYear().should.equal(2000);
            d.getMonth().should.equal(4);
            d.getDate().should.equal(31);
        });

        it("handles overflow", function () {
            var d = RawDate.fromUnits(2000, 4, 5);

            d.setDate(32);
            d.getYear().should.equal(2000);
            d.getMonth().should.equal(5);
            d.getDate().should.equal(1);

            // add one year
            d.setDate(366);
            d.getYear().should.equal(2001);
            d.getMonth().should.equal(5);
            d.getDate().should.equal(1);

            d.setDate(5000);
            d.getYear().should.equal(2015);
            d.getMonth().should.equal(1);
            d.getDate().should.equal(7);
        });
    });

    describe("hours", function () {
        it("works", function () {
            var d = RawDate.fromUnits(2000, 0, 1);
            d.getHours().should.equal(0);

            d.setHours(5);
            d.getDate().should.equal(1);
            d.getHours().should.equal(5);
            d.getMinutes().should.equal(0);

            d.setHours(24);
            d.getDate().should.equal(2);
            d.getHours().should.equal(0);
            d.getMinutes().should.equal(0);

            d.setHours(-1);
            d.getDate().should.equal(1);
            d.getHours().should.equal(23);
            d.getMinutes().should.equal(0);

            // chaining
            d.setHours(0).setHours(1);
            d.getDate().should.equal(1);
            d.getHours().should.equal(1);
            d.getMinutes().should.equal(0);
        });
    });

    describe("minutes", function () {
        it("works", function () {
            var d = RawDate.fromUnits(2000, 0, 1);
            d.getMinutes().should.equal(0);

            d.setMinutes(5);
            d.getMinutes().should.equal(5);
            d.getHours().should.equal(0);

            d.setMinutes(65);
            d.getMinutes().should.equal(5);
            d.getHours().should.equal(1);

            d.setMinutes(-5);
            d.getMinutes().should.equal(55);
            d.getHours().should.equal(0);

            // chaining
            d.setMinutes(115).setMinutes(-5);
            d.getMinutes().should.equal(55);
            d.getHours().should.equal(0);
        });
    });

    describe("seconds", function () {
        it("works", function () {
            var d = RawDate.fromUnits(2000, 0, 1);
            d.getSeconds().should.equal(0);

            d.setSeconds(5);
            d.getSeconds().should.equal(5);
            d.getMinutes().should.equal(0);

            d.setSeconds(65);
            d.getSeconds().should.equal(5);
            d.getMinutes().should.equal(1);

            d.setSeconds(-5);
            d.getSeconds().should.equal(55);
            d.getMinutes().should.equal(0);

            // chaining
            d.setSeconds(115).setSeconds(-5);
            d.getSeconds().should.equal(55);
            d.getMinutes().should.equal(0);
        });
    });

    describe("milliseconds", function () {
        it("works", function () {
            var d = RawDate.fromUnits(2000, 0, 1);
            d.getMilliseconds().should.equal(0);

            d.setMilliseconds(5);
            d.getMilliseconds().should.equal(5);
            d.getSeconds().should.equal(0);

            d.setMilliseconds(995);
            d.getMilliseconds().should.equal(995);
            d.getSeconds().should.equal(0);

            d.setMilliseconds(1995);
            d.getMilliseconds().should.equal(995);
            d.getSeconds().should.equal(1);

            d.setMilliseconds(-1995);
            d.getMilliseconds().should.equal(5);
            d.getSeconds().should.equal(59);

            d.setMilliseconds(5).setMilliseconds(8);
            d.getMilliseconds().should.equal(8);
            d.getSeconds().should.equal(59);
        });
    });
});
