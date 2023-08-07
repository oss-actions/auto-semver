import { debug, notice, setOutput } from "jamesons-actions-toolkit";
import { readFileSync } from "node:fs";
import minorVersion from "./minorVersion";
import majorVersion from "./majorVersion";
import { resolve } from "node:path";

const version = JSON.parse(
	readFileSync(resolve(__dirname, "../../package.json")).toString(),
).version;

export async function setVersion(
	newVersion: string,
	oldVersion: string,
	vprefix: boolean,
) {
	const v = (vprefix ? "v" : "") + newVersion;
	await setOutput("version", v);
	await setOutput("minor_version", minorVersion(v));
	await setOutput("major_version", majorVersion(v));
	debug(
		"Outputting version = %s, minor_version = %s, major_version = %s",
		v,
		minorVersion(v),
		majorVersion(v),
	);
	notice(
		"new version(%s), old version(%s) (using auto-semver %s)",
		newVersion,
		oldVersion,
		version,
	);
}
