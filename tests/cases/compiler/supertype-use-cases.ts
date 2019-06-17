// Covariant-by-default type
interface Box<T> {
    value: T;
}

interface BoxWithMethods<T> {
    value: T;

    contains(arg: T): boolean;
    contains2(arg: T | super T): boolean;
}

declare const neverBox: Box<never>;
declare const unknownBox: Box<unknown>;
declare const stringBox: Box<string>;
declare const numberBox: Box<number>;
declare const stringNumberBox: Box<string | number>;

declare const numberBoxWithMethods: BoxWithMethods<number>;

declare const s: string, n: number, sn: string | number;

namespace Good {
    declare function setValue<T>(box: Box<super T>, value: T): void;
    declare function contains<T>(box: Box<T>, value: super T): void;

    // Should error, does
    setValue(stringBox, sn);

    // Should error, does
    setValue(unknownBox, 0);

    // ????
    setValue(neverBox, 0);

    numberBoxWithMethods.contains(sn);
    numberBoxWithMethods.contains2(sn);
}

namespace Bad {
    declare function setValue<T>(box: Box<T>, value: T): void;
    // Should error, doesn't (sn might be number)
    setValue(stringBox, sn);

    declare function contains<T>(box: Box<T>, value: T): void;

    // Should OK
    contains(stringBox, sn);
    contains(stringNumberBox, sn);
}

namespace Concrete {
}

