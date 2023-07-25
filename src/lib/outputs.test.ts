import { readFileSync } from "fs";

function parseOutputs(contents: string): Record<string, string> {
	const outputs: Record<string, string> = {};
	let variableToDelimiterIndex = contents.indexOf("<<");
	while (variableToDelimiterIndex !== -1) {
		const outputName = contents.substring(0, variableToDelimiterIndex);
		const delimiterEndIndex = contents.indexOf("\n");
		if (delimiterEndIndex === -1) {
			throw new Error(
				`Error parsing outputs when reading '${outputName}': no new line`,
			);
		}
		const delimiter =
			"\n" +
			contents.substring(variableToDelimiterIndex + 2, delimiterEndIndex + 1);
		const closingDelimiterIndex = contents.indexOf(
			delimiter,
			delimiterEndIndex + 1,
		);
		if (closingDelimiterIndex === -1) {
			throw new Error(
				`Error parsing outputs when reading '${outputName}': unexpected EOF`,
			);
		}
		const outputValue = contents.substring(
			delimiterEndIndex + 1,
			closingDelimiterIndex,
		);
		outputs[outputName] = outputValue;
		contents = contents.substring(closingDelimiterIndex + delimiter.length);
		variableToDelimiterIndex = contents.indexOf("<<");
	}
	return outputs;
}

function parseOutputsFromFile(path: string): Record<string, string> {
	return parseOutputs(readFileSync(path).toString());
}

export default function outputs(path = process.env["GITHUB_OUTPUT"]) {
	if (!path) {
		throw new Error("Github output is not defined");
	}
	return parseOutputsFromFile(path);
}

it("parses single output", () => {
	const value = `name<<delimiter\nvalue\ndelimiter\n`;
	const outputs = parseOutputs(value);
	expect(typeof outputs).toStrictEqual("object");
	expect(outputs).not.toBeNull();
	expect(outputs.name).toStrictEqual("value");
});

it("parses multiple output", () => {
	const value = `name1<<delimiter\nvalue1\ndelimiter\nname2<<delimiter\nvalue2\ndelimiter\nname3<<delimiter\nvalue3\ndelimiter\n\n`;
	const outputs = parseOutputs(value);
	expect(typeof outputs).toStrictEqual("object");
	expect(outputs).not.toBeNull();
	expect(outputs.name1).toStrictEqual("value1");
	expect(outputs.name2).toStrictEqual("value2");
	expect(outputs.name3).toStrictEqual("value3");
});
