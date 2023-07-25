import { mkdirSync, rmSync, writeFileSync } from "fs";
import { setVersion } from "./setVersion";
import { join } from "path";
import outputs from "./outputs.test";
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

it("writes new version to output", () => {
	setVersion("new", "old");
	const out = outputs();
	expect(out.version).toStrictEqual("vnew");
});
