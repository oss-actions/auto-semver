export default function splitByLine(lines: string): string[] {
	return lines.trim().split(/[\r\n]+/g);
}
