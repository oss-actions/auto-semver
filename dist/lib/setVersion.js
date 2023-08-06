"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVersion = void 0;
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const minorVersion_1 = __importDefault(require("./minorVersion"));
const majorVersion_1 = __importDefault(require("./majorVersion"));
function setVersion(newVersion, oldVersion, vprefix) {
    const v = (vprefix ? "v" : "") + newVersion;
    (0, jamesons_actions_toolkit_1.setOutput)("version", v);
    (0, jamesons_actions_toolkit_1.setOutput)("minor_version", (0, minorVersion_1.default)(v));
    (0, jamesons_actions_toolkit_1.setOutput)("major_version", (0, majorVersion_1.default)(v));
    (0, jamesons_actions_toolkit_1.debug)("Outputting version = %s, minor_version = %s, major_version = %s", v, (0, minorVersion_1.default)(v), (0, majorVersion_1.default)(v));
    (0, jamesons_actions_toolkit_1.notice)("new version(%s), old version(%s)", newVersion, oldVersion);
}
exports.setVersion = setVersion;
