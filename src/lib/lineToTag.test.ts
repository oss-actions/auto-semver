import lineToTag from "./lineToTag";

it("converts git ref line to tag object", () => {
	const ref = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
	const version = "1.0.0";
	const result = lineToTag(ref + "\trefs/tags/v" + version);
	expect(result).not.toBeUndefined();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	expect(result!.ref).toStrictEqual(ref);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	expect(result!.version).toStrictEqual(version);
});

it("returns undefined on invalid line", () => {
	{
		const ref = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaax";
		const version = "1.0.0";
		const result = lineToTag(ref + "\trefs/tags/v" + version);
		expect(result).toBeUndefined();
	}
	{
		const ref = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
		const version = "1.0.0-1";
		const result = lineToTag(ref + "\trefs/tags/v" + version);
		expect(result).toBeUndefined();
	}
});
