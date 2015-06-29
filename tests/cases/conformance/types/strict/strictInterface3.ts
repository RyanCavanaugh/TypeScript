strict interface Base {
	name: string;
}

// Should not be OK
interface BadDerived extends Base {
	name: number;
}

