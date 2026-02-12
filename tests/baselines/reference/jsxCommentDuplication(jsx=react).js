//// [tests/cases/compiler/jsxCommentDuplication.tsx] ////

//// [jsxCommentDuplication.tsx]
function App() {}
const jsx = <App>/* no */{/* 1 */ 123 /* 2 */}/* no */</App>;

//// [jsxCommentDuplication.js]
function App() { }
var jsx = React.createElement(App, null,
    "/* no */", /* 1 */
    123 /* 2 */,
    "/* no */");
