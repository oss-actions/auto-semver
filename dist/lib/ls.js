"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const splitByLine_1 = __importDefault(require("./splitByLine"));
const lineToTagWithVPrefix_1 = __importDefault(require("./lineToTagWithVPrefix"));
const lineToTagWithoutVPrefix_1 = __importDefault(require("./lineToTagWithoutVPrefix"));
const node_os_1 = require("node:os");
const $ = new jamesons_actions_toolkit_1.Cash((0, node_os_1.type)() === "Windows_NT" ? jamesons_actions_toolkit_1.PowerShell : jamesons_actions_toolkit_1.Bash);
$.ignoreExitCode = false;
/**
 * List remote tags for a repository.
 * @param gitUrl The URL (with token) to the repository to list remote tags for.
 */
async function ls(gitUrl, vprefix = true) {
    try {
        const url = new URL(gitUrl);
        url.password = "";
        (0, jamesons_actions_toolkit_1.debug)(`Listing remote ${url.href}`);
    }
    catch (_a) {
        // ignore
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const stdout = await $ `git ls-remote --tags ${gitUrl}`.stdout;
        (0, jamesons_actions_toolkit_1.debug)(stdout);
        return (0, splitByLine_1.default)(stdout)
            .map(vprefix ? lineToTagWithVPrefix_1.default : lineToTagWithoutVPrefix_1.default)
            .filter((tag) => tag !== undefined);
    }
    catch (err) {
        (0, jamesons_actions_toolkit_1.error)(err);
        throw new Error("Could not list tags");
    }
}
exports.default = ls;
