/// <reference path="../fourslash.ts"/>

// @Filename: /proj2/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true
////     },
////     "files": ["b.ts"]
//// }

// @Filename: /proj2/b.ts
//// export function doSomething() { }

// @Filename: /proj1/tsconfig.json
//// {
////     "compilerOptions": {
////     },
////     "files": ["a.ts"],
////     "references": [{ "path": "../proj2" }]
//// }

// @Filename: /proj1/a.ts
//// import * as f from '../proj2/b'
//// b.doSomething();
//// /**/

goTo.marker();
edit.insert("b.doSomething");
edit.insert("()");
