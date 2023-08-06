"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
function setDefaultVersion(type, vprefix) {
    const prefix = vprefix ? "v" : "";
    if (type === "major") {
        (0, jamesons_actions_toolkit_1.setOutput)("version", prefix + "1.0.0");
        (0, jamesons_actions_toolkit_1.setOutput)("minor_version", prefix + "1.0");
        (0, jamesons_actions_toolkit_1.setOutput)("major_version", prefix + "1");
        (0, jamesons_actions_toolkit_1.notice)("No previous version, defaulting to %s1.0.0 because type is major", prefix);
    }
    else {
        (0, jamesons_actions_toolkit_1.setOutput)("version", prefix + "0.1.0");
        (0, jamesons_actions_toolkit_1.setOutput)("minor_version", prefix + "0.1");
        (0, jamesons_actions_toolkit_1.setOutput)("major_version", prefix + "0");
        (0, jamesons_actions_toolkit_1.notice)("No previous version, defaulting to %s0.1.0 because type isn't major", prefix);
    }
}
exports.default = setDefaultVersion;
