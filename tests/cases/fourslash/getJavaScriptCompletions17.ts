/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// /**
////  * @param {number} age
////  */
//// function Person(age) {
////     this.age = age; // <- it knows age is a number
//// }
//// 
//// var p1 = new Person();
//// var a = p1.age./**/; // <- it doesn't know this is a number

goTo.marker();
verify.completionListContains('toFixed', undefined, undefined, 'method');
