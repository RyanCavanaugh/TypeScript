// @jsx: react-jsxdev,preserve
// @module: commonjs
// @filename: jsxCommentDuplication.tsx
function App() {}
const x = 123;

// Simplified test case based on maintainer's guidance
const jsx = <div>/*pre*/{x}/*post*/</div>;

// Original issue repro
const jsx2 = <App>/* no */{/* 1 */ 123 /* 2 */}/* no */</App>;