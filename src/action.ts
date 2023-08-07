import { getInput, string, boolean } from "jamesons-actions-toolkit";
import incrementVersionForRepository from "./lib/incrementVersionForRepository";

export default async function action() {
	const token = getInput("token", { optional: false, type: string });
	const repository = getInput("repository", { optional: false, type: string });
	const type = getInput("type", { optional: false, type: string });
	let vprefix = getInput("vprefix", { optional: true, type: boolean });
	if (vprefix === undefined) vprefix = true;

	await incrementVersionForRepository(
		`https://github-actions:${token}@github.com/${repository}.git`,
		type,
		vprefix,
	);
}
