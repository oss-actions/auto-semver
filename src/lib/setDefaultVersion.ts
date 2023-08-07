import { notice, setOutput } from "jamesons-actions-toolkit";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const version = JSON.parse(
	readFileSync(resolve(__dirname, "../../package.json")).toString(),
);

export default async function setDefaultVersion(
	type: string,
	vprefix: boolean,
) {
	const prefix = vprefix ? "v" : "";
	if (type === "major") {
		await setOutput("version", prefix + "1.0.0");
		await setOutput("minor_version", prefix + "1.0");
		await setOutput("major_version", prefix + "1");
		notice(
			"No previous version, defaulting to %s1.0.0 because type is major (using auto-semver %s)",
			prefix,
			version,
		);
	} else {
		await setOutput("version", prefix + "0.1.0");
		await setOutput("minor_version", prefix + "0.1");
		await setOutput("major_version", prefix + "0");
		notice(
			"No previous version, defaulting to %s0.1.0 because type isn't major (using auto-semver %s)",
			prefix,
			version,
		);
	}
}
