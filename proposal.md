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
 
Additionally, there is no good workaround for this problem.

This is a common problem to encounter; see #1327, #392, #1817, #3489, http://stackoverflow.com/questions/29207118/typescript-adding-only-an-optional-property-removes-type-checking, http://stackoverflow.com/questions/13213739/why-are-undeclared-object-properties-not-flagged-as-errors


## Strict Interfaces

A `strict` interface is a type `S` that is *not* a supertype of any other type `T` which has properties not present in `S`.

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

### Uses
`strict` interfaces are a natural fit for many places in code:

 * Defining property bags, where an unknown option name is always going to be disregarded
 * Defining all-optional interfaces that still retain safety against property name typos

## Decision Points
There are a few pivot points. Let's review each.

> Can I extend a `strict` interface? Isn't `strict` the same as `sealed`?

It is valid to `extend` a `strict` interface. `strict` **is not** `sealed` or `final`)! Extending a strict interface is an important ability; forexample if you wrap some other API and want to re-use their options bag plussome of your own, extending the interface to add more members makes a lot of sense.

> Can I augment a `strict` interface?

Yes. Again, adding members to an options bag is important for modeling plug-ins.

> Is an interface extended from a `strict` interface also `strict` ?

No. An subtype of a strict interface may or may not want to be strict; by defaulting to 'off' the choice can be made more naturally (rather than trying to add syntax to turn off strictness on a certain declaration)

> Can I `implements` a `strict` interface?

You may, but a class will almost certainly have more properties than the strict interface it implements. We might consider disallowing this because it's so unlikely to actually work in practice.

## Spec Details

A few notes on how this impacts the spec:
 
 * Do not take the apparent type of the source type when the target type is strict. Adding the apparent members from `Object` will cause the relation to fail.
 * When checking `interface A extends B { ... }` where `B` is strict, `B`'s strictness is ignored for the check that `A` is assignable to `B` (otherwise `A` could declare no members!)
 * 