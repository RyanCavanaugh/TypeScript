//// [tests/cases/compiler/jsxCommentDuplication.tsx] ////

//// [jsxCommentDuplication.tsx]
function App() {}
const jsx = <App>/* no */{/* 1 */ 123 /* 2 */}/* no */</App>;

//// [jsxCommentDuplication.jsx]
function App() { }
var jsx = <App>/* no */{123}/* no */</App>;
