///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// exports.something = function() {
////     return true;
//// }

debug.printScriptLexicalStructureItems();
verify.getScriptLexicalStructureListContains('something', undefined);
