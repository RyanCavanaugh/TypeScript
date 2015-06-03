//// [tsxElementResolution10.tsx]
declare module JSX {
	interface Element { }
	interface ElementClass {
		render: any;
	}
}

interface Obj1 {
	new(n: string): { x: number };
}
var obj1: Obj1;
<obj1 x={10} />; // Error, no render member

interface Obj2 {
	(n: string): { x: number; render: any; };
}
var obj2: Obj2;
<obj2 x={32} render={100} />; // OK


//// [tsxElementResolution10.jsx]
var obj1;
<obj1 x={10}/>; // Error, no render member
var obj2;
<obj2 x={32} render={100}/>; // OK
