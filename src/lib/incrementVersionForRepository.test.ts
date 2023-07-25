import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { outputDir, prepareRepositoryWithTags } from "./ls.test";
import { collect, replaceStdout } from "./stdout.test";
import incrementVersionForRepository from "./incrementVersionForRepository";
import outputs from "./outputs.test";
import { join } from "node:path";

const outputFile = join(outputDir, "outputs.txt");

beforeEach(() => {
	replaceStdout();
	mkdirSync(outputDir, { recursive: true });
	writeFileSync(outputFile, "");
	process.env["GITHUB_OUTPUT"] = outputFile;
});

afterEach(() => {
	rmSync("test-data", { recursive: true, force: true });
	collect();
});

it("fails when type is not valid", async () => {
	await expect(
		incrementVersionForRepository(outputDir, "invalid"),
	).rejects.toThrow("Invalid increment type 'invalid'");
});

it("sets default version to v1.0.0 when major", async () => {
	prepareRepositoryWithTags();
	await incrementVersionForRepository(outputDir, "major");
	expect(outputs().version).toStrictEqual("v1.0.0");
});

it("sets default version to v0.1.0 when minor", async () => {
	prepareRepositoryWithTags();
	await incrementVersionForRepository(outputDir, "minor");
	expect(outputs().version).toStrictEqual("v0.1.0");
});

it("sets default version to v0.1.0 when patch", async () => {
	prepareRepositoryWithTags();
	await incrementVersionForRepository(outputDir, "patch");
	expect(outputs().version).toStrictEqual("v0.1.0");
});

it("increments patch", async () => {
	prepareRepositoryWithTags("v0.1.0");
	await incrementVersionForRepository(outputDir, "patch");
	expect(outputs().version).toStrictEqual("v0.1.1");
});

it("increments minor", async () => {
	prepareRepositoryWithTags("v0.1.1", "v0.1.2");
	await incrementVersionForRepository(outputDir, "minor");
	expect(outputs().version).toStrictEqual("v0.2.0");
});

it("increments major", async () => {
	prepareRepositoryWithTags("v0.1.1", "v0.1.2");
	await incrementVersionForRepository(outputDir, "major");
	expect(outputs().version).toStrictEqual("v1.0.0");
});
