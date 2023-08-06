import { debug, notice, setOutput } from "@actions/core";
import minorVersion from "./minorVersion";
import majorVersion from "./majorVersion";

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
		`Outputting version = ${v}, minor_version = ${minorVersion(
			v,
		)}, major_version = ${majorVersion(v)}`,
	);
	notice(`new version(${newVersion}), old version(${oldVersion})`);
}
