//// [tsxElementResolution12.tsx]
declare module JSX {
	interface Element { }
	interface ElementAttributesProperty { pr: any; }
	interface IntrinsicElements { }
}

interface Obj1 {
	new(n: string): any;
}
var obj1: Obj1;
<obj1 x={10} />; // OK

interface Obj2 {
	new(n: string): { q?: number; pr: any };
}
var obj2: Obj2;
<obj2 x={10} />; // OK

interface Obj3 {
	new(n: string): { x: number; };
}
var obj3: Obj3;
<obj3 x={10} />; // Error

interface Obj4 {
	new(n: string): { x: number; pr: { x: number; } };
}
var obj4: Obj4;
<obj4 x={10} />; // OK
<obj4 x={'10'} />; // Error


//// [tsxElementResolution12.jsx]
var obj1;
<obj1 x={10}/>; // OK
var obj2;
<obj2 x={10}/>; // OK
var obj3;
<obj3 x={10}/>; // Error
var obj4;
<obj4 x={10}/>; // OK
<obj4 x={'10'}/>; // Error
