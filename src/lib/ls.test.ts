import { join } from "node:path";
import ls from "./ls";
import { mkdirSync, rmSync } from "node:fs";
import { type ExecOptions, execSync } from "node:child_process";
import { collect, replaceStdout } from "./stdout.test";

export const outputDir = join(process.cwd(), "test-data");

const execOptions = { cwd: outputDir, stdio: "pipe" } as ExecOptions;

export function prepareRepositoryWithTags(...tags: string[]) {
	mkdirSync(outputDir, { recursive: true });
	execSync("git init", execOptions);
	execSync("git config user.name 'test'", execOptions);
	execSync("git config user.email 'test@test.test'", execOptions);
	execSync("git commit --allow-empty -m 'initial commit'", execOptions);
	for (const tag of tags) {
		execSync("git tag " + tag, execOptions);
	}
}

beforeEach(() => {
	replaceStdout();
});

afterEach(() => {
	rmSync("test-data", { recursive: true, force: true });
	collect();
});

it("fails in directory that is not a repository", async () => {
	await expect(ls(outputDir)).rejects.toThrow(Error);
});

it("returns empty array on no tags", async () => {
	prepareRepositoryWithTags();
	const tags = await ls(outputDir);
	expect(tags).toBeInstanceOf(Array);
	expect(tags.length).toStrictEqual(0);
});

it("returns valid tags in repository with one", async () => {
	prepareRepositoryWithTags("hello", "world", "v1.0.0");
	const tags = await ls(outputDir);
	expect(tags).toBeInstanceOf(Array);
	expect(tags.length).toStrictEqual(1);
	expect(tags[0].version).toStrictEqual("1.0.0");
});

it("returns valid tags in repository with multiple", async () => {
	prepareRepositoryWithTags("hello", "world", "v1.0.0", "v1.2.0", "v1.2.3");
	const tags = await ls(outputDir);
	expect(tags).toBeInstanceOf(Array);
	expect(tags.length).toStrictEqual(3);
	expect(tags[0].version).toStrictEqual("1.0.0");
	expect(tags[1].version).toStrictEqual("1.2.0");
	expect(tags[2].version).toStrictEqual("1.2.3");
});
