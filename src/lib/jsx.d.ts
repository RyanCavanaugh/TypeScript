declare module JSX {
    /// Attributes in elements that begin with names in this interface
    /// are checked according to the types in this interface rather than
    /// by the corresponding property of the element class type.
    interface SpecialAttributePrefixes { }

    /// An expression of the form <SomeValue /> is valid
    /// if a member called SomeValue is found in the Intrinsics interface (including when
    /// Intrinsics has a string indexer),
    /// or if SomeValue is of type 'any' or has at least 1 call or construct
    /// signature and all signatures return a type that is assignable to ElementClass.
    interface ElementClass { }

    /// If the resolved element type has a property matching the single
    /// property name present in this type, attributes are typechecked against
    /// the corresponding properties in that property's type
    interface ElementAttributeProperty { }

    /// Element names are resolved using the properties in this
    /// interface before being resolved as a value.
    interface Intrinsics { }
}
