import splitByLine from "./splitByLine";

it("trims line", () => {
	const result = splitByLine("  hello  \n");
	expect(result).toBeInstanceOf(Array);
	expect(result.length).toStrictEqual(1);
	expect(result[0]).toStrictEqual("hello");
});

it("splits line on line break", () => {
	const result = splitByLine("  hello\r\n  world  ");
	expect(result).toBeInstanceOf(Array);
	expect(result.length).toStrictEqual(2);
	expect(result[0]).toStrictEqual("hello");
	expect(result[1]).toStrictEqual("  world");
});

it("ignores empty lines", () => {
	const result = splitByLine(
		"  hello\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n  world  ",
	);
	expect(result).toBeInstanceOf(Array);
	expect(result.length).toStrictEqual(2);
	expect(result[0]).toStrictEqual("hello");
	expect(result[1]).toStrictEqual("  world");
});
