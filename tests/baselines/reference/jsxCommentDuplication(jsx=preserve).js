//// [tests/cases/compiler/jsxCommentDuplication.tsx] ////

//// [jsxCommentDuplication.tsx]
// Simple test case to reproduce JSX comment duplication
const x = 42;
const jsx = <div>/*pre*/{x}/*post*/</div>;

//// [jsxCommentDuplication.jsx]
// Simple test case to reproduce JSX comment duplication
var x = 42;
var jsx = <div> /*pre*//*pre*/{x} /*post*//*post*/</div>;
