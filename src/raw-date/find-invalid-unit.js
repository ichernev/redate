import { isLeapYear } from './is-leap-year';

export function findInvalidUnit(y, month, d, h, minute, s, ms) {
    // TODO: Find null's in-between other values
    var res;
    switch (false) {
        case maybeInteger(y):
            res = 0;
            break;
        case maybeIntegerRange(month, 0, 11):
            res = 1;
            break;
        case maybeIntegerRange(d, 1, daysPerMonth(y || 0, month || 0)):
            res = 2;
            break;
        case maybeIntegerRange(h, 0, 23):
            res = 3;
            break;
        case maybeIntegerRange(minute, 0, 59):
            res = 4;
            break;
        case maybeIntegerRange(s, 0, 59):
            res = 5;
            break;
        case maybeIntegerRange(ms, 0, 999):
            res = 6;
            break;
        default:
            res = -1;
    }

    return res;
}

function maybeInteger(num) {
    return num == null || Number.isInteger(num);
}

function maybeIntegerRange(num, lo, hi) {
    return num == null || (Number.isInteger(num) && lo <= num && num <= hi);
}

function daysPerMonth(year, month) {
    var leap = isLeapYear(year);
    return [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
