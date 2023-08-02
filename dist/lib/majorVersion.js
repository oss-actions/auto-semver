"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function majorVersion(version) {
    return version.substring(0, version.indexOf("."));
}
exports.default = majorVersion;
