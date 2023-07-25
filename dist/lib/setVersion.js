"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVersion = void 0;
const core_1 = require("@actions/core");
function setVersion(newVersion, oldVersion) {
    (0, core_1.setOutput)("version", "v" + newVersion);
    (0, core_1.notice)(`new version(${newVersion}), old version(${oldVersion})`);
}
exports.setVersion = setVersion;
