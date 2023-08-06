import { debug, error, Cash, PowerShell, Bash } from "jamesons-actions-toolkit";
import splitByLine from "./splitByLine";
import lineToTagWithVPrefix, { type Version } from "./lineToTagWithVPrefix";
import lineToTagWithoutVPrefix from "./lineToTagWithoutVPrefix";
import { type } from "node:os";

const $ = new Cash(type() === "Windows_NT" ? PowerShell : Bash);
$.ignoreExitCode = false;

/**
 * List remote tags for a repository.
 * @param gitUrl The URL (with token) to the repository to list remote tags for.
 */
export default async function ls(
	gitUrl: string,
	vprefix: boolean,
): Promise<Version[]> {
	try {
		const url = new URL(gitUrl);
		url.password = "";
		debug(`Listing remote ${url.href}`);
	} catch {
		// ignore
	}
	try {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const stdout = await $`git ls-remote --tags ${gitUrl}`.stdout!;
		debug(stdout);
		return splitByLine(stdout)
			.map(vprefix ? lineToTagWithVPrefix : lineToTagWithoutVPrefix)
			.filter((tag) => tag !== undefined) as Version[];
	} catch (err) {
		error(err);
		throw new Error("Could not list tags");
	}
}
