// Keep modern emit in baseline to focus this test on type-checking behavior.
// @target: es2015

// Repro from https://github.com/microsoft/TypeScript/issues/52912
type Source1 = { array: Source2[] };
type Source2 = { array: Source3[] };
type Source3 = { array: Source4[] };
type Source4 = {};

type Target1 = { array: Target2[] };
type Target2 = { array: Target3[] };
type Target3 = { array: Target4[] };
type Target4 = { someNewProperty: string };

// All assignments below should fail because Source4 lacks Target4.someNewProperty.
declare const source1: Source1;
declare const source2: Source2;
declare const source3: Source3;
declare const source4: Source4;

const target1: Target1 = source1;
const target2: Target2 = source2;
const target3: Target3 = source3;
const target4: Target4 = source4;

// Reordered checks should also fail to verify relation-cache order does not affect correctness.
const reorderedTarget2: Target2 = source2;
const reorderedTarget1: Target1 = source1;
