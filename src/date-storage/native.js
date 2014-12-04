export class NativeDateStorage {
    static fromUnits(...units) {
        return new NativeDateStorage({units});
    }

    // private
    constructor(opts) {
        if (arguments.length !== 1) {
            this._d = null;
            return;
        }

        if (opts.units) {
            this._d = new Date(Date.UTC(...opts.units));
        }
    }

    getYear() {
        return this._d.getUTCFullYear();
    }

    getMonth() {
        return this._d.getUTCMonth();
    }

    getDate() {
        return this._d.getUTCDate();
    }

    getHours() {
        return this._d.getUTCHours();
    }

    getMinutes() {
        return this._d.getUTCMinutes();
    }

    getSeconds() {
        return this._d.getUTCSeconds();
    }

    getMilliseconds() {
        return this._d.getUTCMilliseconds();
    }

    setYear(y) {
        return this._d.setUTCFullYear(y);
    }

    setMonth(month) {
        return this._d.setUTCMonth(month);
    }

    setDate(d) {
        return this._d.setUTCDate(d);
    }

    setHours(h) {
        return this._d.setUTCHours(h);
    }

    setMinutes(m) {
        return this._d.setUTCMinutes(m);
    }

    setSeconds(s) {
        return this._d.setUTCSeconds(s);
    }

    setMilliseconds(ms) {
        return this._d.setUTCMilliseconds(ms);
    }
}
