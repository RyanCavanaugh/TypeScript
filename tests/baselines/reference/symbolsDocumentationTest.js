//// [tests/cases/compiler/symbolsDocumentationTest.ts] ////

//// [symbolsDocumentationTest.ts]
// Test case for symbols documentation - demonstrates name resolution behavior

type x = number;           // Type symbol in global scope
const globalVar = 42;      // Value symbol in global scope  

function fn(x: string, globalVar: boolean) {  // Parameters shadow global symbols
  let y: x = x;            // Type 'x' resolves to global type alias, value 'x' resolves to parameter
  let z = globalVar;       // Resolves to parameter, not global variable
  
  function nested() {
    let x = "nested";      // Block-scoped variable shadows parameter
    return x.length;       // Resolves to local variable
  }
  
  return nested();
}

interface I {              // Interface symbol
  method(): void;
}

interface I {              // Interface merging - adds to same symbol
  prop: string;
}

class C implements I {     // Class symbol, can merge with interface
  prop = "test";
  method() {}
}

namespace N {              // Namespace symbol
  export const value = 1;
}

namespace N {              // Namespace merging
  export function func() {}
}

// Test various contexts where name resolution differs
const test1: I = new C();  // 'I' resolves to merged interface, 'C' resolves to class
const test2 = N.value;     // 'N' resolves to merged namespace
const test3 = N.func();    // Same namespace, different export

//// [symbolsDocumentationTest.js]
// Test case for symbols documentation - demonstrates name resolution behavior
var globalVar = 42; // Value symbol in global scope  
function fn(x, globalVar) {
    var y = x; // Type 'x' resolves to global type alias, value 'x' resolves to parameter
    var z = globalVar; // Resolves to parameter, not global variable
    function nested() {
        var x = "nested"; // Block-scoped variable shadows parameter
        return x.length; // Resolves to local variable
    }
    return nested();
}
var C = /** @class */ (function () {
    function C() {
        this.prop = "test";
    }
    C.prototype.method = function () { };
    return C;
}());
var N;
(function (N) {
    N.value = 1;
})(N || (N = {}));
(function (N) {
    function func() { }
    N.func = func;
})(N || (N = {}));
// Test various contexts where name resolution differs
var test1 = new C(); // 'I' resolves to merged interface, 'C' resolves to class
var test2 = N.value; // 'N' resolves to merged namespace
var test3 = N.func(); // Same namespace, different export
