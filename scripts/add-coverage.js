// @ts-check
const ts = require("typescript");
const path = require("path");
const fs = require("fs");



const homeDir = path.join(__dirname, "../built/local/");

/**
 * @type {Array<{start: number, content: string}>}
 */
const changes = [];
const positions = [];
const content = fs.readFileSync(path.join(homeDir, "run.js"), { encoding: "utf-8"});
const file = ts.createSourceFile("run.js", content, ts.ScriptTarget.ES2020, true, ts.ScriptKind.JS);

changes.push({
    start: 0,
    content: "var __codecov = {};"
});
ts.forEachChild(file, instrument);

changes.sort((a, b) => {
    return a.start - b.start;
});

let changeIndex = 0;
let newContent = "";
let i = 0;
while (changeIndex < changes.length) {
    newContent += content.substring(i, changes[changeIndex].start) + changes[changeIndex].content;
    i = changes[changeIndex].start;
    changeIndex++;
}
newContent += content.substring(i);
fs.writeFileSync(path.join(homeDir, "run-instrumented.js"), newContent);
fs.writeFileSync(path.join(homeDir, "positions.json"), JSON.stringify(positions));

/**
 * 
 * @param {ts.Node} node 
 */
function instrument(node) {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration: {
            const fn = /** @type { ts.FunctionDeclaration }*/(node);
            changes.push({
                start: fn.body?.getStart() + 1,
                content: mark(fn.body?.getStart())
            });
        }
        break;

    case ts.SyntaxKind.IfStatement: {
            const ifs = /** @type { ts.IfStatement }*/(node);
            if (ifs.thenStatement.kind === ts.SyntaxKind.Block) {
                changes.push({
                    start: ifs.thenStatement.getStart() + 1,
                    content: mark(ifs.thenStatement.getStart())
                });
            }
        }
        break;
    }
    ts.forEachChild(node, instrument);
}

function mark(pos) {
    const lc = lineCol(pos);
    const res = `__codecov["${lc}"]=1;`
    positions.push(lc);
    return res;
}

/**
 * 
 * @param {number} pos 
 * @returns {string}
 */
function lineCol(pos) {
    const linecol = file.getLineAndCharacterOfPosition(pos);
    return `${linecol.line}:${linecol.character}`;
}