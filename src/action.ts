import { getBooleanInput, getInput } from "@actions/core";
import incrementVersionForRepository from "./lib/incrementVersionForRepository";

export default async function action() {
	const token = getInput("token", { required: true });
	const repository = getInput("repository", { required: true });
	const type = getInput("type", { required: true });
	const vprefix = getBooleanInput("vprefix", { required: false });

	await incrementVersionForRepository(
		`https://github-actions:${token}@github.com/${repository}.git`,
		type,
		vprefix,
	);
}
