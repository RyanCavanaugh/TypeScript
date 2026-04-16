//// [tests/cases/compiler/deeplyNestedArrayAssignment.ts] ////

//// [deeplyNestedArrayAssignment.ts]
// Repro from #52912
// Tests that chains of distinct array types are not incorrectly treated as deeply nested recursive types.

type Source1 = { array: Source2[] };
type Source2 = { array: Source3[] };
type Source3 = { array: Source4[] };
type Source4 = {};

type Target1 = { array: Target2[] };
type Target2 = { array: Target3[] };
type Target3 = { array: Target4[] };
type Target4 = { someNewProperty: string };

declare const source1: Source1;
declare const source2: Source2;
declare const source3: Source3;
declare const source4: Source4;

// All of these should be errors because SourceN is not assignable to TargetN
const target1: Target1 = source1; // error
const target2: Target2 = source2; // error
const target3: Target3 = source3; // error
const target4: Target4 = source4; // error


//// [deeplyNestedArrayAssignment.js]
"use strict";
// Repro from #52912
// Tests that chains of distinct array types are not incorrectly treated as deeply nested recursive types.
// All of these should be errors because SourceN is not assignable to TargetN
const target1 = source1; // error
const target2 = source2; // error
const target3 = source3; // error
const target4 = source4; // error
