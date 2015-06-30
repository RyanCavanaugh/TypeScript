//// [strictInterface2.ts]
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


//// [strictInterface2.js]
function addHandler(x) { }
// Should be an error
addHandler(function (x) {
    return null;
});
