//// [exportImplementsNamespace1.ts]
interface Foo {
  x: number;
  y: string;
}

module M {
  export implements Foo;
  export var x: number;
  export var y: number;
}



//// [exportImplementsNamespace1.js]
var M;
(function (M) {
})(M || (M = {}));
