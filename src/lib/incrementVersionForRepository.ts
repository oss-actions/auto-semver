import findHighestVersion from "./findHighestVersion";
import incrementVersion from "./incrementVersion";
import ls from "./ls";
import setDefaultVersion from "./setDefaultVersion";
import { setVersion } from "./setVersion";

export default async function incrementVersionForRepository(
	gitUrl: string,
	type: string,
) {
	switch (type) {
		case "major":
		case "minor":
		case "patch":
			break;
		default:
			throw new Error(`Invalid increment type '${type}'`);
	}

	const versions = await ls(gitUrl);

	if (versions.length === 0) {
		return setDefaultVersion(type);
	}

	const highest = findHighestVersion(versions);
	const newVersion = incrementVersion(highest, type);

	setVersion(newVersion, highest.version);
}
