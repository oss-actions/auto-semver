const REGEX =
	/^(?<ref>[a-f0-9]{40})\trefs\/tags\/v(?<version>[0-9]+\.[0-9]+\.[0-9]+)$/;

export interface Version {
	ref: string;
	version: string;
}

export default function lineToTag(line: string): Version | undefined {
	const match = line.match(REGEX);
	if (match === null) return;
	return {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ref: match.groups!.ref,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		version: match.groups!.version,
	};
}
