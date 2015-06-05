//// [tsxElementResolution8.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

// Error
var div = 3;
<div />;

// OK
function fact(): any { return null; }
<fact />

// Error
function fnum(): number{ return 42; }
<fnum />

interface Obj1 {
	new(): {};
	(): number;
}
var obj1: Obj1;
<obj1 />; // OK, prefer construct signatures

interface Obj2 {
	(): number;
}
var obj2: Obj2;
<obj2 />; // Error

interface Obj3 {
}
var obj3: Obj3;
<obj3 />; // Error


//// [tsxElementResolution8.jsx]
// Error
var div = 3;
<div />;
// OK
function fact() { return null; }
<fact />;
// Error
function fnum() { return 42; }
<fnum />;
var obj1;
<obj1 />; // OK, prefer construct signatures
var obj2;
<obj2 />; // Error
var obj3;
<obj3 />; // Error
