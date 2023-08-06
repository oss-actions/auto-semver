import getHighestVersionByCompare from "./getHighestVersionByCompare";
import type { Version } from "./lineToTagWithVPrefix";

const expected: [a: string, b: string, n: 0 | 1][] = [
	["1.0.0", "2.0.0", 1],
	["2.0.0", "1.0.0", 0],
	["1.2.3", "1.2.4", 1],
];

it("returns the highest version object", () => {
	for (const [a, b, n] of expected) {
		const A: Version = { version: a, ref: "" };
		const B: Version = { version: b, ref: "" };
		const E = [A, B][n];
		expect(getHighestVersionByCompare(A, B)).toStrictEqual(E);
	}
});
