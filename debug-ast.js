const ts = require("./built/local/typescript.js");

const sourceCode = `const jsx = <div>/*a*/{x}/*b*/</div>;`;
const sourceFile = ts.createSourceFile("test.tsx", sourceCode, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function printNode(node, depth = 0) {
  const indent = "  ".repeat(depth);
  const kindName = ts.SyntaxKind[node.kind];
  const posInfo = `(${node.pos}-${node.end})`;
  let extraInfo = "";
  
  if (node.text !== undefined) {
    extraInfo += ` text:"${node.text}"`;
  }
  
  console.log(`${indent}${kindName} ${posInfo}${extraInfo}`);
  
  // Print the actual source text for this node range
  if (node.pos >= 0 && node.end > node.pos) {
    const nodeText = sourceCode.substring(node.pos, node.end);
    console.log(`${indent}  source: "${nodeText}"`);
  }
  
  ts.forEachChild(node, child => printNode(child, depth + 1));
}

console.log("AST for:", sourceCode);
printNode(sourceFile);