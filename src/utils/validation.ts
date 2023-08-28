export function isInteger(value: unknown): value is number {
	if (!value) return false;

	if (typeof value === "string") {
		const number = parseInt(value);
		if (isNaN(number)) return false;
		if (number.toString() == value) return true;
		return false;
	}

	if (typeof value !== "number") return false;
	return Number.isInteger(value);
}
