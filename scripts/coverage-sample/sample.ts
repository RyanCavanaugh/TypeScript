const fs = require('fs');
const path = require('path');

declare var __codecov: any;
let ccovData: Record<string, { bestTime: number, name: string }> = {};
let start: bigint;
function markStart() {
    start = process.hrtime.bigint();
    __codecov = {};
}
function markDone(testName: string) {
    const time = Number(process.hrtime.bigint() - start);
    Object.keys(__codecov).forEach(pt => {
        if (!(pt in ccovData) || time < ccovData[pt].bestTime) {
            ccovData[pt] = { name: testName, bestTime: time };
        }
    });
}
function complete() {
    fs.writeFileSync(path.join(__dirname, "codecov.json"), JSON.stringify(ccovData, undefined, 2));
}

const tests = [test1, test2, test3];
for (const c of tests) {
    markStart();
    c();
    markDone(c.name);
}
complete();

function test1() {
    someLogic(0, "");
}

function test2() {
    someLogic("foo", "");
}

function test3() {
    someLogic(3, 3);
}

function someLogic(a: string | number, b: string | number) {
    if (typeof a === "string") {
        if (typeof b === "string") {
            void 'ok';
        } else {
            void 'ok';
        }
        return;
    }

    if (typeof b === "string") {
        void 'ok';
    } else {
        void 'ok';
    }
}