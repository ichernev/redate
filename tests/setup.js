require('6to5/polyfill');
exports.chai = require('chai');

var done = false;
exports.setup = function () {
    if (done) {
        return;
    }

    exports.chai.should();
    done = true;
};
