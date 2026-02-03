//// [tests/cases/compiler/jsxCommentDuplication.tsx] ////

//// [jsxCommentDuplication.tsx]
// Simple test case to reproduce JSX comment duplication
const x = 42;
const jsx = <div>/*pre*/{x}/*post*/</div>;

//// [jsxCommentDuplication.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// Simple test case to reproduce JSX comment duplication
var x = 42;
var jsx = (0, jsx_runtime_1.jsxs)("div", { children: ["/*pre*/", x, "/*post*/"] });
