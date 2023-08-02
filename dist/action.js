"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const incrementVersionForRepository_1 = __importDefault(require("./lib/incrementVersionForRepository"));
async function action() {
    const token = (0, core_1.getInput)("token", { required: true });
    const repository = (0, core_1.getInput)("repository", { required: true });
    const type = (0, core_1.getInput)("type", { required: true });
    await (0, incrementVersionForRepository_1.default)(`https://github-actions:${token}@github.com/${repository}.git`, type);
}
exports.default = action;
