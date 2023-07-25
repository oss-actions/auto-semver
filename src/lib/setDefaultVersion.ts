import { notice, setOutput } from "@actions/core";

export default function setDefaultVersion(type: string) {
	if (type === "major") {
		setOutput("version", "v1.0.0");
		notice("No previous version, defaulting to v1.0.0 because type is major");
	} else {
		setOutput("version", "v0.1.0");
		notice(
			"No previous version, defaulting to v0.1.0 because type isn't major",
		);
	}
}
