// @lib: es2015
// Test for await expression followed by non-null assertion
async function test() {
    const result1 = (await null as any)!;
    const result2 = (await Promise.resolve(42))!;
    const result3 = (await null)!;
}