# How to Give Up

> Running out of time? Here's what to do

If you're being told to wrap up because you're out of time, we'd like you to still submit the testcase you wrote even if it's failing.
Also discuss what determinations you've made so far, e.g. what your experiments demonstrated and what you think the next steps are.
Write these in a format that we can put in the issue to help you on a future iteration.
For example, write down why initial theories you had turned out to be incorrect, or other useful notes.

# Common Commands

> Command listing for how to build, run, format, lint, etc

```
npx hereby local             # Build the compiler into built/local
npx hereby runtests-parallel # Run all tests; this may take 15 minutes or longer
npx hereby runtests -t <grep> # Run testcases matching a specific pattern
npx hereby baseline-accept   # Accept new test baselines
npx hereby lint              # Run lint. Always do this before submitting
npx hereby format            # Run code formatting. Always do this before submitting
```

# How to Finish a Session

> Information about mandatory tasks to do at the end of a session

When you think you're done, there are some mandatory things you need to do before finishing your task and completing your fix.

If you have a fix, explain in 1-4 paragraphs your understanding of the origin of the bug and why your fix is the correct one.

If you haven't already, run `hereby runtests-parallel` and ensure there are zero errors.
You should expect a full test run to take up to 20 minutes to finish.
Read the sections on Baseline Tests if you don't know how to manage the output of baseline diffs.
Remember, there is no such thing as an "unrelated" failure in this repo!

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

> How to write, run, and manage tests related to core tsc functionality (scan, parse, bind, check, and emit)

In general, all testcases you add related to core checker behavior should be in the form of baseline tests.
These tests validate TypeScript behavior, type checking, symbol resolution, and error reporting.
You should read the "Dealing with Baselines" topic once you've written a test.

## Dealing with Baselines

> How to work with baseline-based tests like those in `tests/cases/compiler`

When compiler tests run, they create baseline files.
If these baseline files match what's already in the repo, the test passes.
Otherwise, the test fails, and a new file appears in `tests/baselines/local`.

The failure when you create a new test is expected; for new content, example the baseline output to see that it matches what you expect, and run `hereby baseline-accept`.

Often, a correct bufix will still cause baseline differences.
You need to analyze the difference between the new baseline in `tests/baselines/local` and the checked-in version at `tests/baselines/reference`, and determine for yourself if the change is desirable or not.

If the change isn't desirable, adjust your bugfix and run the tests again. Iterate as needed.

If the change is desirable, run `hereby baseline-accept`, which will copy the new file to `tests/baselines/reference`.
This will be a diff that you should submit as part of your PR.

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
If it's useful to test multiple flag values at once, you can use commas:
```ts
// @target: ES2015,ES2022
```

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

You can run a test by name by running
```
npx hereby runtests -t filenameOfThatTest
```
where filename is just any substring, e.g. if you write `tests/cases/compiler/foo.ts`, run `hereby runtests -t foo`

# TypeScript Binder and Symbols System

> Technical overview of how symbols in TypeScript work

TypeScript's binder creates symbols that represent declarations in your code, and the checker uses these symbols for type checking and name resolution. Understanding this system is crucial for debugging complex issues and understanding how TypeScript resolves names and types.

## What are Symbols?

Symbols are TypeScript's internal representation of declarations. Each symbol has:

- **flags**: A bitmask from `SymbolFlags` enum that describes what kind of declaration it represents
- **escapedName**: The internal string representation of the symbol's name  
- **declarations**: Array of AST nodes that declare this symbol
- **members**: SymbolTable for nested symbols (class members, interface properties, etc.)
- **exports**: SymbolTable for module exports
- Internal tracking fields for type checking and resolution

```ts
// From types.ts
export interface Symbol {
    flags: SymbolFlags;                     // Symbol flags
    escapedName: __String;                  // Name of symbol
    declarations?: Declaration[];           // Declarations associated with this symbol
    valueDeclaration?: Declaration;         // First value declaration of the symbol
    members?: SymbolTable;                  // Class, interface or object literal instance members
    exports?: SymbolTable;                  // Module exports
    // ... additional internal fields
}
```

## SymbolFlags

SymbolFlags is a bitmask enum that categorizes what kinds of declarations a symbol represents:

```ts
export const enum SymbolFlags {
    FunctionScopedVariable  = 1 << 0,   // var or parameter
    BlockScopedVariable     = 1 << 1,   // let or const
    Property                = 1 << 2,   // Property or enum member
    Function                = 1 << 4,   // Function
    Class                   = 1 << 5,   // Class
    Interface               = 1 << 6,   // Interface
    TypeAlias               = 1 << 19,  // Type alias
    // ... many more
    
    // Composite flags for common combinations
    Variable = FunctionScopedVariable | BlockScopedVariable,
    Value = Variable | Property | Function | Class | /* ... */,
    Type = Class | Interface | TypeAlias | /* ... */,
}
```

Key composite flags:
- **Value**: Symbols that exist at runtime (variables, functions, classes, etc.)
- **Type**: Symbols that exist only at compile time (interfaces, type aliases, etc.)
- **Namespace**: Symbols that can contain other symbols (modules, enums, etc.)

## SymbolTable

A SymbolTable is simply a `Map<__String, Symbol>` that stores symbols by their escaped names:

```ts
export type SymbolTable = Map<__String, Symbol>;

export function createSymbolTable(symbols?: readonly Symbol[]): SymbolTable {
    const result = new Map<__String, Symbol>();
    if (symbols) {
        for (const symbol of symbols) {
            result.set(symbol.escapedName, symbol);
        }
    }
    return result;
}
```

## How the Binder Works

The binder (binder.ts) traverses the AST and creates symbols for declarations. Key functions:

### createSymbol
Creates a new symbol with specified flags and name:
```ts
function createSymbol(flags: SymbolFlags, name: __String): Symbol {
    symbolCount++;
    return new Symbol(flags, name);
}
```

### declareSymbol
Adds symbols to symbol tables, handling conflicts and merging:
```ts
function declareSymbol(
    symbolTable: SymbolTable, 
    parent: Symbol | undefined, 
    node: Declaration, 
    includes: SymbolFlags, 
    excludes: SymbolFlags
): Symbol
```

The `excludes` parameter defines what kinds of symbols cannot coexist. For example:
- `BlockScopedVariable` excludes all `Value` symbols (no redeclaration)
- `FunctionScopedVariable` excludes `Value & ~FunctionScopedVariable` (can merge with other vars)
- `Interface` excludes `Type & ~(Interface | Class)` (can merge with other interfaces and classes)

### Symbol Resolution Process

During binding, each declaration gets processed:
1. Determine the symbol flags based on declaration type
2. Get or create symbol in appropriate symbol table
3. Check for conflicts using excludes flags
4. Add declaration to symbol's declarations array
5. Set up members/exports SymbolTables if needed

## How Name Resolution Works

The `resolveName` function (created by `createNameResolver` in utilities.ts) implements lexical scoping by walking up the scope chain:

```ts
function resolveNameHelper(
    location: Node | undefined,
    name: __String,
    meaning: SymbolFlags,  // What kind of symbol we're looking for
    // ...
): Symbol | undefined
```

### Resolution Algorithm

1. **Local Scope Check**: If current node can have locals, check its symbol table
2. **Scope-Specific Rules**: Apply visibility rules based on context:
   - Function parameters only visible in function body
   - Type parameters visible in parameter list and return type
   - Block-scoped variables respect block boundaries
3. **Parent Scope**: Move up to parent node and repeat
4. **Module Exports**: Check module exports if in module context
5. **Global Scope**: Finally check global symbols

### Context-Sensitive Resolution

The `meaning` parameter filters which symbols are considered:
```ts
// Looking for a type
resolveName(location, "x", SymbolFlags.Type, ...)
// Looking for a value  
resolveName(location, "x", SymbolFlags.Value, ...)
```

## The Classic Example Explained

```ts
type x = number;       // Creates symbol: flags=TypeAlias, name="x"
function fn(x: string) { // Creates symbol: flags=FunctionScopedVariable, name="x"
  let y: x = x;        // Two different lookups happen here
}
```

When the checker processes `let y: x = x;`:

1. **Type position `x`**: 
   - Calls `resolveName(location, "x", SymbolFlags.Type, ...)`
   - Walks up scopes looking for Type symbols
   - Finds the type alias `x = number` in global scope
   - Returns that symbol

2. **Value position `x`**:
   - Calls `resolveName(location, "x", SymbolFlags.Value, ...)`  
   - Checks function locals first
   - Finds parameter `x: string` 
   - Returns that symbol

This demonstrates how:
- The same name can resolve to different symbols
- Context (Type vs Value) affects resolution
- Scope hierarchy determines which symbol is found
- The binder creates appropriate symbol tables for different scopes

## Symbol Merging

Some declarations can merge their symbols:
- Multiple `var` declarations with same name
- `interface` declarations merge their members
- `namespace` and `enum` can merge with compatible declarations
- Classes and interfaces can merge (declaration merging)

The binder handles this by checking `excludes` flags and either merging with existing symbols or creating conflicts.

## Debugging Tips

When debugging symbol-related issues:
1. Check what SymbolFlags a symbol has using `symbol.flags & SymbolFlags.SomeFlag`
2. Print symbol names with `symbolToString()` or `symbol.escapedName`
3. Examine symbol.declarations to see all AST nodes for that symbol
4. Use checker's `getSymbolAtLocation()` to see what symbol a node resolves to
5. Check if you're looking for the right meaning (Type vs Value vs Namespace)

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
