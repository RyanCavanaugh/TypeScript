// @ts-check
const path = require("path");
const fs = require("fs");
const ts = require("typescript");
const sourcemap = require("source-map");
const _ = require("lodash");

const rawSourceMapText = fs.readFileSync(path.join(__dirname, "../built/local/run.js.map"), { encoding: "utf-8" });
/**
 * @type {sourcemap.SourceMapConsumer}
 */
// @ts-ignore
const sourceMapInfo = sourcemap.SourceMapConsumer(rawSourceMapText);

const coverageData = JSON.parse(fs.readFileSync(path.join(__dirname, "../built/local/codecov.json"), { encoding: "utf-8" }));
const positions = JSON.parse(fs.readFileSync(path.join(__dirname, "../built/local/positions.json"), { encoding: "utf-8" }));

const originals = [];

for (const posName of positions) {
    const [, line, col] = /(\d+):(\d+)/.exec(posName);
    // @ts-ignore
    const orig = sourceMapInfo.originalPositionFor({ line: +line + 1, column: +col });
    
    // TODO: Investigate these; this should not happen in practice
    if (orig.line === null) continue;

    // console.log(posName + " => " + orig.source + " L" + orig.line + " C" + orig.column);
    originals.push({
        source: orig.source,
        line: orig.line,
        col: orig.column,
        posName: posName
    });
}

originals.sort((a, b) => {
    if (a.source === b.source) {
        if (a.line === b.line) {
            return a.col - b.col;
        }
        return a.line - b.line;
    } else if (a.source > b.source) {
        return 1;
    }
    return -1;
});

const filenames = _.uniq(originals.map(o => o.source));
const origin = path.join(__dirname, "../built/local/");
let covReport = "";
for (const sourceName of filenames) {
    const originalFilename = path.join(origin, sourceName);
    console.log(originalFilename);
    const source = fs.readFileSync(originalFilename, { encoding: "utf-8" });
    const sourceFile = ts.createSourceFile("sample.ts", source, ts.ScriptTarget.Latest, true);
    const positions = originals.filter(o => o.source === sourceName);
    let pos = 0;
    covReport += `/*== ${path.relative(path.join(__dirname, ".."), originalFilename)} ==*/\n`;
    while (true) {
        const nextPosition = positions.shift();
        if (nextPosition === undefined) break;

        if (nextPosition.posName in coverageData) {
            covReport += ` /*✅ ${coverageData[nextPosition.posName].name}*/ `;
        } else {
            covReport += " /*❌*/ ";
        }

        // console.log(`Read position of ${nextPosition.line}, ${nextPosition.col} from ${originalFilename}`);
        // This function has zero-based line numbers but source maps report 1-based line numbers
        const nextPos = sourceFile.getPositionOfLineAndCharacter(nextPosition.line - 1, nextPosition.col);
        covReport += source.substring(pos, nextPos);
        pos = nextPos;

    }
    covReport += "\n";
}
fs.writeFileSync("codecov.ts", covReport);

/*

    if (posName in coverageData) {
        console.log("COVERED");
    } else {
        console.log("NOT COVERED");
    }
}
*/
