# How to Finish a Session

> Information about mandatory tasks to do at the end of a session

When you think you're done, there are some mandatory things you need to do before finishing your task and completing your fix.

If you haven't already, run `hereby runtests-parallel` and ensure there are zero errors. Read the sections on Baseline Tests if you don't know how to manage the output of baseline diffs.

Next, run `hereby lint`. Fix any errors reported here. Lint errors will generally never cause new test failures to appear.

Last, run `hereby format`. This will ensure your code matches the repo coding guidelines.

# How to Debug

> Tips and tricks for how to debug code

printf debugging is going to be very useful as you are figuring things out.
To do this, use `console.log`, but you'll need to `ts-ignore` it.
Write something like this:
```ts,diff
function checkSomething(n: Node) {
    doSomething(n);
+   // @ts-ignore DEBUG CODE ONLY, REMOVE ME WHEN DONE
+   console.log(`Got node with pos = ${n.pos}`);
    doSomethingElse(n);
}
```

We have a lot of enums so you might want to print back their symbolic name, to do this, index back into the name of the enum
```ts
   // @ts-ignore DEBUG CODE ONLY, REMOVE ME WHEN DONE
   console.log(`Got node with kind = ${SyntaxKind[n.kind]}`);
```

If you run a specific test using `hereby runtests -t testName`, you will see the console output from these `log` calls.

# Compiler Tests

> How to work with baseline-based tests like those in `tests/cases/compiler`

In general, all testcases you add related to core checker behavior should be in the form of baseline tests. These tests validate TypeScript behavior, type checking, symbol resolution, and error reporting. When these tests run, they either pass (because the output matches the reference copy in `tests/baselines/reference`), or fail and create a new file in `tests/baselines/local`.

The failure when you create a new test is expected; for new content, example the baseline output to see that it matches what you expect, and run `hereby baseline-accept` to copy the new file to `tests/baselines/reference`

When this failure occurs in other situations, compare the new file to the old file and make sure it's expected, and run `hereby baseline-accept`. This will generate a diff you should commit as part of your changes.

## Creating

> How to create a new compiler test, and its syntax

Put a new file in `tests/cases/compiler` using a descriptive (but reasonably short) filename. The file extension must be `.ts`, you should never check in a file named `.d.ts` here.

## Test File Syntax

> Syntax for how to set options and filenames in compiler baseline tests

The file format looks like this
```ts
// @strict: true
// @target: ES2015
// @lib: ES2015,DOM

let x: string = 42; // Error expected
```
You can set any TypeScript compiler option using the `// @flag: value` syntax.

The default file extension for the interior file is `.ts`, but you can change that (or create multiple files) with filename directives:
```ts
// @Filename: helper.tsx
export function helper(x: number): string {
    let x = <div></div>;
    return x.toString();
}

// @Filename: main.ts
import { helper } from "./helper";
const result = helper(42);
```

Use comments to document expected behavior:
```ts
abstract class Base {
    abstract method(): void;
}

class Derived extends Base {
    // Missing implementation - should error
}

new Base(); // Should error - cannot instantiate abstract class
```


# Fourslash Testing

> Fourslash is our testing system for language service functionality

Fourslash tests are interactive TypeScript language service tests. They validate IDE features like completions, quick info, navigation, and refactoring. You create a new fourslash test by putting a file in `tests/cases/fourslash`.

They have a "user code" section, prefixed by four slashes per line, followed by one or more instructions for what to do with the code. Within the code, a `/**/` comment creates an anonymous "marker"; named markers use alphanumeric text between the stars (`/*here*/`). You can use the markers to refer to specific positions in the code:
```typescript
////function foo(x: number) {
////    return x + 1;
////}
////let result = foo(/**/42);

goTo.marker();
verify.baselineSignatureHelp();
```

Use `// @Filename:` to define multiple files:
```typescript
// @Filename: /a.ts
////export const value = 42;

// @Filename: /b.ts  
////import { value } from './a';
////console.log(/*marker*/value);
```

Use `[|text|]` to define text ranges, which can be used for selecting text or describing expected Find All References results.
```typescript
////function test() {
////    [|return 42;|]
////}
```

More code examples:
```typescript
// Moving the virtual caret around
goTo.marker("markerName");         // Navigate to marker
goTo.marker();                     // Navigate to anonymous marker /**/

// Verifying expected results (generally preferred over baselines in these tests)
verify.currentLineContentIs("expected content");
verify.completions({ includes: "itemName" });
verify.completions({ excludes: "itemName" });
verify.quickInfoIs("expected info");
verify.codeFix({
    description: "Fix description",
    newFileContent: "expected content after fix"
});

// Completions testing
verify.completions({ 
    marker: "1",
    includes: { name: "foo", source: "/a", hasAction: true },
    isNewIdentifierLocation: true,
    preferences: { includeCompletionsForModuleExports: true }
});

// Code fixes testing
verify.codeFix({
    description: "Add missing property",
    index: 0,
    newFileContent: `class C {
    property: string;
    method() { this.property = "value"; }
}`
});

// Formatting
format.document();
verify.currentLineContentIs("formatted content");
```
