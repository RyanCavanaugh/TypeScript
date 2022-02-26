// @ts-check
const ts = require("typescript");
const path = require("path");
const fs = require("fs");

const fileName = process.argv[2];
const homeDir = path.dirname(fileName);
if (!fileName.endsWith(".js")) {
    throw new Error(`Must provide .js file - given ${fileName}`);
}

/**
 * @type {Array<{start: number, content: string}>}
 * 
 * This is a list of all the text insertions we want to put into the output-instrumented.js file
 */
const changes = [];
// The positions lists keeps track of every location in the output.js file we added
// an instrumentation mark to. This gets saved to disk. Later, during report generation,
// we can enumerate this list to see where in the output.js file (which we'll map back to
// input.ts files) we should include covered/not-covered markers.
const positions = [];
const content = fs.readFileSync(fileName, { encoding: "utf-8" });
const file = ts.createSourceFile("_sample.js", content, ts.ScriptTarget.ES2020, true, ts.ScriptKind.JS);

instrument();
emit();

function instrument() {
    changes.push({
        start: 0,
        content: "var __codecov = {};"
    });
    ts.forEachChild(file, instrumentWorker);
}

function emit() {
    // Apply changes in reverse order so we don't have to do any bookkeeping
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
    // Write out the output-instrumented.js file
    const jsOut = path.join(homeDir, path.basename(fileName).replace(".js", "-instrumented.js"));
    console.log(`Write new file to ${jsOut}`);
    fs.writeFileSync(jsOut, newContent);
    const positionsFile = path.join(homeDir, "positions.json");
    console.log(`Write positions file to ${positionsFile}`);
    fs.writeFileSync(positionsFile, JSON.stringify(positions));
}

/**
 * 
 * @param {ts.Node} node 
 */
function instrumentWorker(node) {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration: {
            const fn = /** @type { ts.FunctionDeclaration }*/(node);
            if (fn.body.statements.length > 0) {
                insertMarkAtPosition(fn.body?.statements[0].getStart());
            }
        }
        break;

    case ts.SyntaxKind.IfStatement: {
            const ifs = /** @type { ts.IfStatement }*/(node);
            if (ifs.thenStatement.kind === ts.SyntaxKind.Block) {
                instrumentBlock(/** @type {ts.Block} */(ifs.thenStatement));
            }
            if (ifs.elseStatement?.kind === ts.SyntaxKind.Block) {
                instrumentBlock(/** @type {ts.Block} */(ifs.elseStatement));
            }
        }
        break;
    }
    ts.forEachChild(node, instrumentWorker);
}

/**
 * 
 * @param {ts.BlockLike} block 
 */
function instrumentBlock(block) {
    if (block.statements.length > 0) {
        insertMarkAtPosition(block.statements[0].getStart());
    } else {
        insertMarkAtPosition(block.getStart() + 1);

    }
}

function insertMarkAtPosition(pos) {
    changes.push({
        start: pos,
        content: mark(pos)
    });
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