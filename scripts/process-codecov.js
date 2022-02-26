// @ts-check
const path = require("path");
const fs = require("fs");
const ts = require("typescript");
const sourcemap = require("source-map");
const _ = require("lodash");

const fileName = path.basename(process.argv[2]);
const homeDir = path.dirname(process.argv[2]);
if (!fileName.endsWith(".js")) {
    throw new Error(`Must provide .js file - given ${fileName}`);
}
console.log(`Processing ${fileName} from ${homeDir}`);
processCoverage();

async function processCoverage() {
    const sourceMapFileName = `${fileName}.map`;
    const rawSourceMapText = readFileOrFail(sourceMapFileName);
    /**
     * @type {sourcemap.SourceMapConsumer}
     */
    // @ts-ignore
    const sourceMapInfo = await new sourcemap.SourceMapConsumer(rawSourceMapText);

    const coverageData = JSON.parse(readFileOrFail("codecov.json"));
    const positions = JSON.parse(readFileOrFail("positions.json"));
    const originals = getOriginalPositions(positions, sourceMapInfo);

    const filenames = _.uniq(originals.map(o => o.source));
    const origin = process.argv[3] || homeDir;
    let covReport = "";
    for (const sourceName of filenames) {
        const originalFilename = path.join(origin, sourceName);
        const source = fs.readFileSync(originalFilename, { encoding: "utf-8" });
        const sourceFile = ts.createSourceFile("sample.ts", source, ts.ScriptTarget.Latest, true);
        const thisFilePositions = originals.filter(o => o.source === sourceName);
        let pos = 0;
        covReport += `/*== ${path.relative(path.join(__dirname, ".."), originalFilename)} ==*/\n`;
        let lastSegment = "";
        let done = false;

        let priorPosition = thisFilePositions.shift();
        while (!done) {
            const thisPosition = thisFilePositions.shift();
            let nextPos;
            if (thisPosition === undefined) {
                done = true;
                nextPos = source.length;
            } else {
                // This function has zero-based line numbers but source maps report 1-based line numbers
                nextPos = sourceFile.getPositionOfLineAndCharacter(thisPosition.line - 1, thisPosition.col);
            }

            const segment = source.substring(pos, nextPos);
            let indentCount = 0;
            let indentCursor = pos - 1;
            while (source.charAt(indentCursor) === " ") {
                indentCount++;
                indentCursor--;
            }
            const indent = new Array(indentCount + 1).join(" ");
            const coveringTest = coverageData[priorPosition.posName];
            if (coveringTest) {
                covReport += `/*✅ ${coveringTest.name} */\n${indent}`;
            } else {
                covReport += `/*❌*/\n${indent}`;
            }
            covReport += segment;

            pos = nextPos;
            lastSegment = segment;
            priorPosition = thisPosition;
        }

        covReport += "\n";
    }


    writeFile("annotated-coverage-report.ts", covReport);
}

/**
 * 
 * @param {*} positions 
 * @param {sourcemap.SourceMapConsumer} sourceMapInfo 
 * @returns 
 */
function getOriginalPositions(positions, sourceMapInfo) {
    const originals = [];
    for (const posName of positions) {
        const [, line, col] = /(\d+):(\d+)/.exec(posName);
        const orig = sourceMapInfo.originalPositionFor({
            line: +line + 1,
            column: +col + 1,
        });

        // TODO: Investigate these; this should not happen in practice
        if (orig.line === null) continue;

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
    return originals;
}

function writeFile(fileName, content) {
    const fullpath = path.join(homeDir, fileName);
    fs.writeFileSync(fullpath, content, { encoding: 'utf-8' });
    console.log(`Wrote output to ${fileName}`);
}

/**
 * @param {string} fileName 
 */
function readFileOrFail(fileName) {
    const fullpath = path.join(homeDir, fileName);
    if (!fs.existsSync(fullpath)) {
        throw new Error(`Expected file '${fullpath} to exist`);
    }
    return fs.readFileSync(fullpath, { encoding: "utf-8" });
}
