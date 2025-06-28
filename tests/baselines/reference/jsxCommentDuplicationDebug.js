//// [tests/cases/compiler/jsxCommentDuplicationDebug.tsx] ////

//// [jsxCommentDuplicationDebug.tsx]
function App() {}
const jsx = <App>/* before */{/* 1 */ 123 /* 2 */}/* after */</App>;

//// [jsxCommentDuplicationDebug.jsx]
function App() { }
var jsx = <App>/* before */{123}/* after */</App>;
