let uuidCounter = 0;

export function uuid() {
	uuidCounter += 1;
	return `uuid-${uuidCounter}`;
}
