// @ts-check
/// <reference path="../node_modules/@types/node/index.d.ts" />

const { join } = require("path");
const { spawn } = require("child_process");
const { argv, cwd, exit } = require("process");

const home = cwd();

if (argv.length === 2) {
    console.log(`Example Usage:`);
    console.log(`  copy scripts/bisector.js ..`);
    console.log(`  git bisect start`);
    console.log(`  git bisect good [rev]`);
    console.log(`  git bisect bad [rev]`);
    console.log(`  git bisect run node ../bisector.js --noEmit --types --skipLibcheck --strict sample.ts`);
} else {
    const tscArgs = argv.slice(2);
    console.log(`Testing commandline: tsc ${tscArgs.join(" ")}`);
    run(tscArgs);
}

function run(tscArgs) {
    // Build
    console.log("Building tsc...");
    const gulp = spawn("node", [join(home, "node_modules/gulp/bin/gulp.js"), "tsc"]);
    gulp.addListener("exit", code => {
        if (code === 0) {
            // Success, execute and check result
            console.log("tsc build succeeded, compiling sample...");
            const tsc = spawn("node", [join(home, "built/local/tsc.js"), ...tscArgs]);
            tsc.addListener("exit", code => {
                if (code === 0) {
                    // Success
                    return process.exit(0);
                } else {
                    // Failure
                    return process.exit(1);
                }
            });
        } else if (code === 1) {
            console.log("Build failed; skipping this revision");
            return process.exit(125);
        } else {
            console.log(`Unknown gulp return code ${code}`);
            return process.exit(4);
        }
    });
}


/*
$ git bisect run my_script arguments
Note that the script (my_script in the above example) should exit with code 0 if the current source code is good/old, and exit with a code between 1 and 127 (inclusive), except 125, if the current source code is bad/new.

Any other exit code will abort the bisect process. It should be noted that a program that terminates via exit(-1) leaves $? = 255, (see the exit(3) manual page), as the value is chopped with & 0377.

The special exit code 125 should be used when the current source code cannot be tested.
If the script exits with this code, the current revision will be skipped (see git bisect skip above).
125 was chosen as the highest sensible value to use for this purpose, because 126 and 127 are used by POSIX shells to signal specific error status (127 is for command not found, 126 is for command found but not executable—​these details do not matter, as they are normal errors in the script, as far as bisect run is concerned).
*/
