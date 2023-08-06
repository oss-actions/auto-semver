import { notice, setOutput } from "@actions/core";

export default function setDefaultVersion(type: string, vprefix: boolean) {
	const prefix = vprefix ? "v" : "";
	if (type === "major") {
		setOutput("version", prefix + "1.0.0");
		setOutput("minor_version", prefix + "1.0");
		setOutput("major_version", prefix + "1");
		notice(
			`No previous version, defaulting to ${prefix}1.0.0 because type is major`,
		);
	} else {
		setOutput("version", prefix + "0.1.0");
		setOutput("minor_version", prefix + "0.1");
		setOutput("major_version", prefix + "0");
		notice(
			`No previous version, defaulting to ${prefix}0.1.0 because type isn't major`,
		);
	}
}
