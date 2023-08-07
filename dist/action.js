"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const incrementVersionForRepository_1 = __importDefault(require("./lib/incrementVersionForRepository"));
const version_1 = __importDefault(require("./version"));
async function action() {
    var _a;
    const token = (0, jamesons_actions_toolkit_1.getInput)("token", { optional: false, type: jamesons_actions_toolkit_1.string });
    const repository = (0, jamesons_actions_toolkit_1.getInput)("repository", { optional: false, type: jamesons_actions_toolkit_1.string });
    const type = (0, jamesons_actions_toolkit_1.getInput)("type", { optional: false, type: jamesons_actions_toolkit_1.string });
    const vprefix = (_a = (0, jamesons_actions_toolkit_1.getInput)("vprefix", { optional: true, type: jamesons_actions_toolkit_1.boolean })) !== null && _a !== void 0 ? _a : true;
    (0, jamesons_actions_toolkit_1.notice)("Using auto-semver@%s", version_1.default);
    await (0, incrementVersionForRepository_1.default)(`https://github-actions:${token}@github.com/${repository}.git`, type, vprefix);
}
exports.default = action;
