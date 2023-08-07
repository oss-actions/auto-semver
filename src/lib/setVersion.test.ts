import { mkdirSync, rmSync, writeFileSync } from "fs";
import { setVersion } from "./setVersion";
import { join } from "path";
import { getGithubOutputs } from "jamesons-actions-toolkit";
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

it("writes new version to output", async () => {
	await setVersion("1.2.3", "old", true);
	const out = await getGithubOutputs();
	expect(out.version).toStrictEqual("v1.2.3");
	expect(out.minor_version).toStrictEqual("v1.2");
	expect(out.major_version).toStrictEqual("v1");
});
