"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = require("semver");
function incrementVersion({ version }, type) {
    var _a, _b;
    const newVersion = ((_b = (_a = (0, semver_1.parse)(version)) === null || _a === void 0 ? void 0 : _a.inc) === null || _b === void 0 ? void 0 : _b.call(_a, type)) || undefined;
    if (!newVersion) {
        throw new Error("Could not increment version!");
    }
    return newVersion.toString();
}
exports.default = incrementVersion;
