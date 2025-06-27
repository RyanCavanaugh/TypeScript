import * as ts from "./built/local/typescript.js";

const sourceCode = `function App() {}
const jsx = <App>/* no */{/* 1 */ 123 /* 2 */}/* no */</App>;`;

const sourceFile = ts.createSourceFile("test.tsx", sourceCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function printAST(node, depth = 0) {
    const indent = "  ".repeat(depth);
    console.log(`${indent}${ts.SyntaxKind[node.kind]}: ${node.text || ""}`);
    
    if (node.kind === ts.SyntaxKind.JsxText) {
        console.log(`${indent}  JSX Text content: "${node.text}"`);
        console.log(`${indent}  Contains only whitespace: ${node.containsOnlyTriviaWhiteSpaces}`);
    }
    
    ts.forEachChild(node, child => printAST(child, depth + 1));
}

console.log("=== AST Structure ===");
printAST(sourceFile);