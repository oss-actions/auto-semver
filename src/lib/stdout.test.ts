import type { WriteStream } from "node:tty";

const original = process.stdout;
let collected = "";

function setStdout(stdout: WriteStream & { fd: 1 }) {
	Object.defineProperty(process, "stdout", {
		get() {
			return stdout;
		},
	});
}

export function replaceStdout() {
	const writer = {
		fd: 1,
		write(chunk, cb1, cb2) {
			collected += chunk.toString();
			typeof cb2 === "function"
				? cb2()
				: typeof cb1 === "function"
				? cb1
				: undefined;
		},
	} as Pick<WriteStream, "write"> & { fd: 1 };
	setStdout(writer as WriteStream & { fd: 1 });
}

export function collect() {
	const data = collected;
	collected = "";
	setStdout(original);
	return data;
}

it("replaces stdout", () => {
	replaceStdout();
	process.stdout.write("hello");
	process.stdout.write("world");
	expect(collect()).toStrictEqual("helloworld");
});
