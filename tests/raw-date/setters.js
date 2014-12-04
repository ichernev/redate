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
    });

    describe("month", function () {
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

            d.getYear().should.equal(2001);
            d.getMonth().should.equal(3);
            d.getDate().should.equal(30);
        });
    });
});
