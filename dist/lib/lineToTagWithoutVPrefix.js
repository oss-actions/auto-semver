"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REGEX = /^(?<ref>[a-f0-9]{40})\trefs\/tags\/(?<version>[0-9]+\.[0-9]+\.[0-9]+)$/;
function lineToTagWithoutVPrefix(line) {
    const match = line.match(REGEX);
    if (match === null)
        return;
    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ref: match.groups.ref,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        version: match.groups.version,
    };
}
exports.default = lineToTagWithoutVPrefix;
