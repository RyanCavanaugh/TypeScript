//// [tsxOtherParsing.tsx]
/// @jsx: preserve

declare namespace JSX {
	interface IntrinsicElements {
		x: { y: number; z: string; };
	}
}

var foo = [];
for (var i = 0; i < foo.length; i++) { }



//// [tsxOtherParsing.js]
/// @jsx: preserve
var foo = [];
for (var i = 0; i < foo.length; i++) { }
