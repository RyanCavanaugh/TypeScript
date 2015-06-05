//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

interface Obj1 {
	new(n: string): { x: number };
	new(n: number): { y: string };
}
var obj1: Obj1;
<obj1 />; // Error, return type is not an object type

interface Obj2 {
	(n: string): { x: number };
	(n: number): { y: string };
}
var obj2: Obj2;
<obj2 />; // Error, return type is not an object type

interface Obj3 {
	(n: string): { x: number };
	(n: number): { x: number; y: string };
}
var obj3: Obj3;
<obj3 x={42} />; // OK
