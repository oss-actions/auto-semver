"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findHighestVersion_1 = __importDefault(require("./findHighestVersion"));
const incrementVersion_1 = __importDefault(require("./incrementVersion"));
const ls_1 = __importDefault(require("./ls"));
const setDefaultVersion_1 = __importDefault(require("./setDefaultVersion"));
const setVersion_1 = require("./setVersion");
async function incrementVersionForRepository(gitUrl, type, vprefix) {
    switch (type) {
        case "major":
        case "minor":
        case "patch":
            break;
        default:
            throw new Error(`Invalid increment type '${type}'`);
    }
    const versions = await (0, ls_1.default)(gitUrl, vprefix);
    if (versions.length === 0) {
        return (0, setDefaultVersion_1.default)(type, vprefix);
    }
    const highest = (0, findHighestVersion_1.default)(versions);
    const newVersion = (0, incrementVersion_1.default)(highest, type);
    (0, setVersion_1.setVersion)(newVersion, highest.version, vprefix);
}
exports.default = incrementVersionForRepository;
