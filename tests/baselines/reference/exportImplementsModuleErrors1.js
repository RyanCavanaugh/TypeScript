//// [exportImplementsModuleErrors1.ts]

interface Foo {
  x: number;
  y: string;
}

export implements Foo;
export var x: number;
export var y: number;



//// [exportImplementsModuleErrors1.js]
"use strict";
