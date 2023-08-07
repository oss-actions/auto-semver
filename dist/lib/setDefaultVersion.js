"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const version = JSON.parse((0, node_fs_1.readFileSync)((0, node_path_1.resolve)(__dirname, "../../package.json")).toString()).version;
async function setDefaultVersion(type, vprefix) {
    const prefix = vprefix ? "v" : "";
    if (type === "major") {
        await (0, jamesons_actions_toolkit_1.setOutput)("version", prefix + "1.0.0");
        await (0, jamesons_actions_toolkit_1.setOutput)("minor_version", prefix + "1.0");
        await (0, jamesons_actions_toolkit_1.setOutput)("major_version", prefix + "1");
        (0, jamesons_actions_toolkit_1.notice)("No previous version, defaulting to %s1.0.0 because type is major (using auto-semver %s)", prefix, version);
    }
    else {
        await (0, jamesons_actions_toolkit_1.setOutput)("version", prefix + "0.1.0");
        await (0, jamesons_actions_toolkit_1.setOutput)("minor_version", prefix + "0.1");
        await (0, jamesons_actions_toolkit_1.setOutput)("major_version", prefix + "0");
        (0, jamesons_actions_toolkit_1.notice)("No previous version, defaulting to %s0.1.0 because type isn't major (using auto-semver %s)", prefix, version);
    }
}
exports.default = setDefaultVersion;
