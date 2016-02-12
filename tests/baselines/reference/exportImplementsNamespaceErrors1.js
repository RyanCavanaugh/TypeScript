//// [tests/cases/conformance/internalModules/moduleDeclarations/exportImplementsNamespaceErrors1.ts] ////

//// [decl.d.ts]
interface Foo {
  x: number;
  y: string;
}

//// [test1.ts]
class X {
	export implements Foo;
}

//// [test2.ts]
interface Y {
	export implements Foo;
}

//// [test3.ts]
module M {
	public export implements Foo;
}

//// [test4.ts]
function fn() {
	export implements Foo;
}

//// [test5.ts]
module M {
	function fn() {
		export implements Foo;
	}	
}

//// [test6.ts]
module M {
	if (true) {
		export implements Foo;
	}
}


//// [test1.js]
"use strict";
var X = (function () {
    function X() {
    }
    return X;
}());
//// [test2.js]
"use strict";
//// [test3.js]
var M;
(function (M) {
})(M || (M = {}));
//// [test4.js]
function fn() {
}
//// [test5.js]
var M;
(function (M) {
    function fn() {
    }
})(M || (M = {}));
//// [test6.js]
var M;
(function (M) {
    if (true) {
    }
})(M || (M = {}));
