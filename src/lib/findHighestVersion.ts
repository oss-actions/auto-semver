import type { Version } from "./lineToTagWithVPrefix";
import { debug } from "@actions/core";
import getHighestVersionByCompare from "./getHighestVersionByCompare";

export default function findHighestVersion(versions: Version[]): Version {
	if (!versions.length) throw new Error("No versions!");

	let highest = versions[0];
	for (let i = 1; i < versions.length; i++) {
		const current = versions[i];
		const winner = getHighestVersionByCompare(highest, current);
		debug(
			`Comparing versions highest(${highest.version}) and current(${current.version}), winner(${winner.version})`,
		);
		highest = winner;
	}

	return highest;
}
