import incrementVersion from "./incrementVersion";

const tests: [
	version: string,
	type: "patch" | "minor" | "major",
	expected: string,
][] = [
	["0.1.0", "patch", "0.1.1"],
	["0.1.1", "minor", "0.2.0"],
	["0.2.2", "major", "1.0.0"],
];

const throws: [
	version: string,
	type: "patch" | "minor" | "major",
	errorKind: ErrorConstructor,
][] = [
	["1", "patch", Error],
	["1.2", "minor", Error],
];

it("increments valid versions", () => {
	for (const [version, type, expected] of tests) {
		expect(incrementVersion({ version, ref: "" }, type)).toStrictEqual(
			expected,
		);
	}
});

it("throws on invalid version", () => {
	for (const [version, type, errorKind] of throws) {
		expect(() => incrementVersion({ version, ref: "" }, type)).toThrow(
			errorKind,
		);
	}
});
