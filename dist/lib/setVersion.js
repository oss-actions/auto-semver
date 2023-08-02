"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVersion = void 0;
const core_1 = require("@actions/core");
const minorVersion_1 = __importDefault(require("./minorVersion"));
const majorVersion_1 = __importDefault(require("./majorVersion"));
function setVersion(newVersion, oldVersion) {
    const v = "v" + newVersion;
    (0, core_1.setOutput)("version", v);
    (0, core_1.setOutput)("minor_version", (0, minorVersion_1.default)(v));
    (0, core_1.setOutput)("major_version", (0, majorVersion_1.default)(v));
    (0, core_1.debug)(`Outputting version = ${v}, minor_version = ${(0, minorVersion_1.default)(v)}, major_version = ${(0, majorVersion_1.default)(v)}`);
    (0, core_1.notice)(`new version(${newVersion}), old version(${oldVersion})`);
}
exports.setVersion = setVersion;
