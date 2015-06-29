## Motivating Examples

Today, TypeScript does not correctly detect certain kinds of errors:
```ts
interface TextOptions {
	alignment?: string;
	color?: string;
	padding?: number;
}
function drawText(opts: TextOptions) { ... }

// No error
drawText({ align: 'center'} );

// No error
function getDefaultOptions: TextOptions {
	return { colour: 'blue'; };
}

// No error, ?!?!
drawText(getDefaultOptions);

// Still no error
drawText(getDefaultOptions());
```

There are two core problems here:
 1. Interfaces with all optional properties are assignable *from* anything with a disjoint set of properties
 2. There is no way to say in the type system "These are the only things I can handle", e.g. options bags should *not* be open-ended from an assignability/subtyping perspective

## Strict Interfaces

A `strict` interface is a type `S` that is *not* a supertype of any other type `T` which has
properties not present in `S`.

### Syntax

An `interface` declaration may accept the `strict` modifier:
```ts
strict interface TextOptions {
	alignment?: string;
	color?: string;
	padding?: number;
}
```

When this modifier is present, types with surplus properties are not assignable to or subtypes of that interface:

```ts
// Error
drawText({ align: 'center'} );

// Error
function getDefaultOptions: TextOptions {
	return { colour: 'blue'; };
}

// Error
drawText(getDefaultOptions);

// Error
drawText(getDefaultOptions());
```
