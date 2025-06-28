//// [tests/cases/compiler/jsxCommentDuplication.tsx] ////

//// [jsxCommentDuplication.tsx]
function App() {}
const jsx = <App>/* no */{/* 1 */ 123 /* 2 */}/* no */</App>;

//// [jsxCommentDuplication.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
function App() { }
var jsx = (0, jsx_runtime_1.jsxs)(App, { children: ["/* no */", /* 1 */ 123 /* 2 */, "/* no */"] });
