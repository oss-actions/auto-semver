"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
function setDefaultVersion(type) {
    if (type === "major") {
        (0, core_1.setOutput)("version", "v1.0.0");
        (0, core_1.notice)("No previous version, defaulting to v1.0.0 because type is major");
    }
    else {
        (0, core_1.setOutput)("version", "v0.1.0");
        (0, core_1.notice)("No previous version, defaulting to v0.1.0 because type isn't major");
    }
}
exports.default = setDefaultVersion;
