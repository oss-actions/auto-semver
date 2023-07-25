import type { Version } from "./lineToTag";
import { compare } from "semver";

export default function getHighestVersionByCompare(
	a: Version,
	b: Version,
): Version {
	if (compare(a.version, b.version) === 1) return a;
	return b;
}
