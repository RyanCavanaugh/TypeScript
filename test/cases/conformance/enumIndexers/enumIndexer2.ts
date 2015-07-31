module Q {
	export enum A { x, y, z }
	export enum B { x, y, z }
}

interface AMap {
	[t: Q.A]: string;
}

interface BMap {
	[t: Q.A]: string;
}

interface FailMap1 {
	[t: typeof Q]: string;
}

interface FailMap2 {
	[t: boolean]: string;
}
