import { debug, notice, setOutput } from "jamesons-actions-toolkit";
import minorVersion from "./minorVersion";
import majorVersion from "./majorVersion";
import { version } from "../../package.json";

export function setVersion(
	newVersion: string,
	oldVersion: string,
	vprefix: boolean,
) {
	const v = (vprefix ? "v" : "") + newVersion;
	setOutput("version", v);
	setOutput("minor_version", minorVersion(v));
	setOutput("major_version", majorVersion(v));
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
