"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const getHighestVersionByCompare_1 = __importDefault(require("./getHighestVersionByCompare"));
function findHighestVersion(versions) {
    if (!versions.length)
        throw new Error("No versions!");
    let highest = versions[0];
    for (let i = 1; i < versions.length; i++) {
        const current = versions[i];
        const winner = (0, getHighestVersionByCompare_1.default)(highest, current);
        (0, jamesons_actions_toolkit_1.debug)("Comparing versions highest(%s) and current(%s), winner(%s)", highest.version, current.version, winner.version);
        highest = winner;
    }
    return highest;
}
exports.default = findHighestVersion;
