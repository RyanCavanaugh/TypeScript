//@filename: file.tsx
//@jsx: preserve
declare module JSX {
	interface Element { }
}

module my {
    export var div: any;
}
// OK
<my.div n='x' />;
// Error
<my.other />;

module q {
    import mine = my;
    // OK
    <mine.div n='x' />;
    // Error
    <mine.non />;
}
