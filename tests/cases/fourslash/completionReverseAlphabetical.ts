/// <reference path="fourslash.ts"/>

////interface TestInterface {
////    zebra: string;
////    apple: string;
////    banana: string;
////    cherry: string;
////}
////
////function test(obj: TestInterface) {
////    obj./*completion*/
////}

// Test that completions are sorted in reverse alphabetical order (Z-A)
verify.completions({
    marker: "completion",
    exact: [
        { name: "zebra", sortText: "11" },
        { name: "cherry", sortText: "11" },
        { name: "banana", sortText: "11" },
        { name: "apple", sortText: "11" }
    ]
});