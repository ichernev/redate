import { NativeDateStorage } from '../date-storage/native';
import { findInvalidUnit } from './find-invalid-unit';
import { isLeapYear } from './is-leap-year';

export class RawDate {
    static resetDefault() {
        RawDate.setDefaults({
            storage: NativeDateStorage
        });
    }

    static setDefaults(defaults) {
        Object.assign(RawDate._defaults, defaults);
    }

    static getDefaults() {
        // return a copy so the user doesn't mess it up
        return Object.assign({}, RawDate._defaults);
    }

    static options(opts) {
        return factory(Object.assign(RawDate.getDefaults(), opts));
    }

    static now() {
        // TODO: Use options.now
        return new RawDate({ms: +(new Date()), opts: RawDate.getDefaults()});
    }

    static fromUnits(...units) {
        return new RawDate({units: units, opts: RawDate.getDefaults()});
    }

    static fromUnixMs(ms) {
        return new RawDate({ms: ms, opts: RawDate.getDefaults()});
    }

    constructor(args) {
        this._opts = args.opts;
        if (args.units != null) {
            let invalidId = findInvalidUnit(...args.units);
            if (invalidId === -1) {
                this._s = this._opts.storage.fromUnits(...args.units);
            } else {
                this._s = null;
                this._invalidId = invalidId;
                console.log("invalid");
            }
        } else if (args.ms != null) {
            this._s = this._opts.storage.fromUnixMs(args.ms);
        }
    }

    isValid() {
        return this._invalidId !== -1;
    }

    invalidId() {
        return this._invalidId;
    }

    getYear() {
        return this._s.getYear();
    }

    getMonth() {
        return this._s.getMonth();
    }

    getDate() {
        return this._s.getDate();
    }

    setYear(y) {
        if (y !== this._s.getYear()) {
            if (this._s.getMonth() === 1 && this._s.getDate() === 29 &&
                    !isLeapYear(y)) {
                this._s.setDate(28);
                this._s.setYear(y);
            } else {
                this._s.setYear(y);
            }
        }
        return this;
    }
}

function factory(opts) {
    return {
        now() {
            return new RawDate({ms: +(new Date()), opts});
        },
        fromUnits(...units) {
            return new RawDate({units, opts});
        },
        fromUnixMs(ms) {
            return new RawDate({ms, opts});
        }
    };
}

RawDate._defaults = {};
RawDate.resetDefault();
