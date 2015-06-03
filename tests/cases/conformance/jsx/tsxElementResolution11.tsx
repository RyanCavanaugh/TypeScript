//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { }
}

interface Obj1 {
	new(n: string): any;
}
var obj1: Obj1;
<obj1 x={10} />; // OK

interface Obj2 {
	new(n: string): { q?: number };
}
var obj2: Obj2;
<obj2 x={10} />; // Error

interface Obj3 {
	new(n: string): { x: number; };
}
var obj3: Obj3;
<obj3 x={10} />; // OK
