enum A { x, y, z }
enum B { x, y, z }

interface AMap {
	[t: A]: string;
}

interface BMap {
	[t: A]: string;
}

let a: AMap;
a[A.x] = 32; // OK
a[B.x] = 32; // No

