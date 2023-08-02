"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function minorVersion(version) {
    return version.substring(0, version.lastIndexOf("."));
}
exports.default = minorVersion;
