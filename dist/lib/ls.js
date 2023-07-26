"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const splitByLine_1 = __importDefault(require("./splitByLine"));
const lineToTag_1 = __importDefault(require("./lineToTag"));
/**
 * List remote tags for a repository.
 * @param gitUrl The URL (with token) to the repository to list remote tags for.
 */
async function ls(gitUrl) {
    let out = "";
    const code = await (0, exec_1.exec)("git", ["ls-remote", "--tags", gitUrl], {
        silent: true,
        ignoreReturnCode: true,
        listeners: {
            stdout: (data) => ((out += data.toString()), undefined),
            stderr: (data) => ((out += data.toString()), undefined),
        },
    });
    if (code !== 0) {
        (0, core_1.error)(out);
        throw new Error("Could not list tags");
    }
    (0, core_1.debug)(out);
    return (0, splitByLine_1.default)(out)
        .map(lineToTag_1.default)
        .filter((tag) => tag !== undefined);
}
exports.default = ls;
