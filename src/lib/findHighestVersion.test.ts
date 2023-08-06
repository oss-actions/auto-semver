import type { Version } from "./lineToTagWithVPrefix";
import { collect, replaceStdout } from "./stdout.test";
import findHighestVersion from "./findHighestVersion";

const expected: [versions: string[], expected: string][] = [
	[["0.1.0"], "0.1.0"],
	[["0.1.0", "0.1.1", "0.1.2", "0.2.0"], "0.2.0"],
];

it("finds the highest version", () => {
	for (const [versions, version] of expected) {
		replaceStdout();
		expect(
			findHighestVersion(
				versions.map((version) => ({ ref: "", version }) as Version),
			).version,
		).toStrictEqual(version);
		collect();
	}
});

it("fails on no versions", () => {
	expect(() => findHighestVersion([])).toThrow(Error);
});
