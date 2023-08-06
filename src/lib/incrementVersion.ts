import { parse } from "semver";
import type { Version } from "./lineToTagWithVPrefix";

export default function incrementVersion(
	{ version }: Version,
	type: "patch" | "minor" | "major",
): string {
	const newVersion = parse(version)?.inc?.(type) || undefined;
	if (!newVersion) {
		throw new Error("Could not increment version!");
	}
	return newVersion.toString();
}
