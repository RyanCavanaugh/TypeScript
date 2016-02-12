interface Foo {
  x: number;
  y: string;
}

module M {
  export implements Foo;
  export var x: number;
  export var y: number;
}

