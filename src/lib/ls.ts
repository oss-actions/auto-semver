import { debug, error } from "@actions/core";
import { exec } from "@actions/exec";
import splitByLine from "./splitByLine";
import lineToTagWithVPrefix, { type Version } from "./lineToTagWithVPrefix";
import lineToTagWithoutVPrefix from "./lineToTagWithoutVPrefix";

/**
 * List remote tags for a repository.
 * @param gitUrl The URL (with token) to the repository to list remote tags for.
 */
export default async function ls(
	gitUrl: string,
	vprefix: boolean,
): Promise<Version[]> {
	let out = "";
	try {
		const url = new URL(gitUrl);
		url.password = "";
		debug(`Listing remote ${url.href}`);
	} catch {
		// ignore
	}
	const code = await exec("git", ["ls-remote", "--tags", gitUrl], {
		silent: true,
		ignoreReturnCode: true,
		listeners: {
			stdout: (data) => ((out += data.toString()), undefined),
			stderr: (data) => ((out += data.toString()), undefined),
		},
	});
	if (code !== 0) {
		error(out);
		throw new Error("Could not list tags");
	}
	debug(out);
	return splitByLine(out)
		.map(vprefix ? lineToTagWithVPrefix : lineToTagWithoutVPrefix)
		.filter((tag) => tag !== undefined) as Version[];
}
