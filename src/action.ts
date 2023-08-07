import { getInput, string, boolean, notice } from "jamesons-actions-toolkit";
import incrementVersionForRepository from "./lib/incrementVersionForRepository";
import version from "./version";

export default async function action() {
	const token = getInput("token", { optional: false, type: string });
	const repository = getInput("repository", { optional: false, type: string });
	const type = getInput("type", { optional: false, type: string });
	const vprefix =
		getInput("vprefix", { optional: true, type: boolean }) ?? true;

	notice("Using auto-semver@%s", version);

	await incrementVersionForRepository(
		`https://github-actions:${token}@github.com/${repository}.git`,
		type,
		vprefix,
	);
}
