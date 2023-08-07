"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = require("semver");
function getHighestVersionByCompare(a, b) {
    if ((0, semver_1.compare)(a.version, b.version) === 1)
        return a;
    return b;
}
exports.default = getHighestVersionByCompare;
