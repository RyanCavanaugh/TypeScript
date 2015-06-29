strict interface EventHandle {
	name: string;
}

// Should be OK
interface EH2 extends EventHandle {
	quality: string;
}

function addHandler(x: (n: EventHandle) => void) {}

// Should be an error
addHandler((x: EH2) => {
	return null;
});
