//// [tsxElementResolution6.tsx]
declare module JSX {
	interface Element { }
	interface IntrinsicElements { }
}

var div: any;
// OK
<div n='x' />;


//// [tsxElementResolution6.jsx]
var div;
// OK
<div n='x'/>;
