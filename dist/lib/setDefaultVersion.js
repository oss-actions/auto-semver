"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const version_1 = __importDefault(require("../version"));
async function setDefaultVersion(type, vprefix) {
    const prefix = vprefix ? "v" : "";
    if (type === "major") {
        await (0, jamesons_actions_toolkit_1.setOutput)("version", prefix + "1.0.0");
        await (0, jamesons_actions_toolkit_1.setOutput)("minor_version", prefix + "1.0");
        await (0, jamesons_actions_toolkit_1.setOutput)("major_version", prefix + "1");
        (0, jamesons_actions_toolkit_1.notice)("No previous version, defaulting to %s1.0.0 because type is major (using auto-semver %s)", prefix, version_1.default);
    }
    else {
        await (0, jamesons_actions_toolkit_1.setOutput)("version", prefix + "0.1.0");
        await (0, jamesons_actions_toolkit_1.setOutput)("minor_version", prefix + "0.1");
        await (0, jamesons_actions_toolkit_1.setOutput)("major_version", prefix + "0");
        (0, jamesons_actions_toolkit_1.notice)("No previous version, defaulting to %s0.1.0 because type isn't major (using auto-semver %s)", prefix, version_1.default);
    }
}
exports.default = setDefaultVersion;
