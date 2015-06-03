//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
}

var div: any;
// OK
<div n='x' />;
