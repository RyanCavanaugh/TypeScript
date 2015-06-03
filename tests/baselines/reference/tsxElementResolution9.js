//// [tsxElementResolution9.tsx]
declare module JSX {
	interface Element { }
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


//// [tsxElementResolution9.jsx]
var obj1;
<obj1 />; // Error, return type is not an object type
var obj2;
<obj2 />; // Error, return type is not an object type
var obj3;
<obj3 x={42}/>; // OK
