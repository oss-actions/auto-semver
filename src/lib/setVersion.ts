import { notice, setOutput } from "@actions/core";

export function setVersion(newVersion: string, oldVersion: string) {
	setOutput("version", "v" + newVersion);
	notice(`new version(${newVersion}), old version(${oldVersion})`);
}
