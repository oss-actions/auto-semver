export default function majorVersion(version: string): string {
	return version.substring(0, version.indexOf("."));
}
