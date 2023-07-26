export default function minorVersion(version: string): string {
	return version.substring(0, version.lastIndexOf("."));
}
