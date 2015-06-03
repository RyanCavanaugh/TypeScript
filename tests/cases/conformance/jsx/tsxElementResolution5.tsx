//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
}

// Error
<div n='x' />;
