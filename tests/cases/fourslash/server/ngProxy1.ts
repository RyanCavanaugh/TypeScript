/// <reference path="../fourslash.ts"/>

// @Filename: tsconfig.json
//// {
////     "files": ["a.ts"],
////     "ng-templates": ["foo.html"]
//// }

// @Filename: a.ts
//// let x = [1, 2];
//// x/**/
//// 

goTo.marker();
debug.printCurrentQuickInfo();
