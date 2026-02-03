// @jsx: preserve,react-jsx
// Simple test case to reproduce JSX comment duplication
const x = 42;
const jsx = <div>/*pre*/{x}/*post*/</div>;