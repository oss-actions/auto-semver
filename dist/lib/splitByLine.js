"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitByLine(lines) {
    return lines.trim().split(/[\r\n]+/g);
}
exports.default = splitByLine;
