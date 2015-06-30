//// [strictInterface3.ts]
strict interface Base {
	name: string;
}

// Should not be OK
interface BadDerived extends Base {
	name: number;
}



//// [strictInterface3.js]
