import { isLeapYear } from './is-leap-year';

export function daysPerMonth(year, month) {
    var leap = isLeapYear(year);
    return [31, 28 + leap, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}
