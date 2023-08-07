"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVersion = void 0;
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const node_fs_1 = require("node:fs");
const minorVersion_1 = __importDefault(require("./minorVersion"));
const majorVersion_1 = __importDefault(require("./majorVersion"));
const node_path_1 = require("node:path");
const version = JSON.parse((0, node_fs_1.readFileSync)((0, node_path_1.resolve)(__dirname, "../../package.json")).toString());
async function setVersion(newVersion, oldVersion, vprefix) {
    const v = (vprefix ? "v" : "") + newVersion;
    await (0, jamesons_actions_toolkit_1.setOutput)("version", v);
    await (0, jamesons_actions_toolkit_1.setOutput)("minor_version", (0, minorVersion_1.default)(v));
    await (0, jamesons_actions_toolkit_1.setOutput)("major_version", (0, majorVersion_1.default)(v));
    (0, jamesons_actions_toolkit_1.debug)("Outputting version = %s, minor_version = %s, major_version = %s", v, (0, minorVersion_1.default)(v), (0, majorVersion_1.default)(v));
    (0, jamesons_actions_toolkit_1.notice)("new version(%s), old version(%s) (using auto-semver %s)", newVersion, oldVersion, version);
}
exports.setVersion = setVersion;
