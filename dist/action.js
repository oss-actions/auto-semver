"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jamesons_actions_toolkit_1 = require("jamesons-actions-toolkit");
const incrementVersionForRepository_1 = __importDefault(require("./lib/incrementVersionForRepository"));
async function action() {
    const token = (0, jamesons_actions_toolkit_1.getInput)("token", { optional: false, type: jamesons_actions_toolkit_1.string });
    const repository = (0, jamesons_actions_toolkit_1.getInput)("repository", { optional: false, type: jamesons_actions_toolkit_1.string });
    const type = (0, jamesons_actions_toolkit_1.getInput)("type", { optional: false, type: jamesons_actions_toolkit_1.string });
    const vprefix = (0, jamesons_actions_toolkit_1.getInput)("vprefix", {
        optional: true,
        type: jamesons_actions_toolkit_1.boolean,
        defaultValue: true,
    });
    await (0, incrementVersionForRepository_1.default)(`https://github-actions:${token}@github.com/${repository}.git`, type, vprefix);
}
exports.default = action;
