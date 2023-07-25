import { mkdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import outputs from "./outputs.test";
import setDefaultVersion from "./setDefaultVersion";
import { collect, replaceStdout } from "./stdout.test";

const outputDir = join(process.cwd(), "test-data");
const outputFile = join(outputDir, "output.txt");

beforeEach(() => {
	mkdirSync(outputDir, { recursive: true });
	writeFileSync(outputFile, "");
	process.env["GITHUB_OUTPUT"] = outputFile;
	replaceStdout();
});

afterEach(() => {
	rmSync("test-data", { recursive: true, force: true });
	collect();
});

it("writes v1.0.0 to version in outputs when major", () => {
	setDefaultVersion("major");
	const out = outputs();
	expect(out.version).toStrictEqual("v1.0.0");
});

it("writes v0.1.0 to version in outputs when not major", () => {
	setDefaultVersion("");
	const out = outputs();
	expect(out.version).toStrictEqual("v0.1.0");
});
