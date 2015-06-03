//// [tsxElementResolution5.tsx]
declare module JSX {
	interface Element { }
}

// Error
<div n='x' />;


//// [tsxElementResolution5.jsx]
// Error
<div n='x'/>;
