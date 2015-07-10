interface Options1 {
  thing1?: string;
  thing2?: number;
}

interface Options2 {
  thing: number;
  otherThing?: string;
}

interface Options3 extends Options1, Options2 { }

// Should error
let x: Options1 = { thing3: 'foo' };

let y: Options3;
// Should be OK
x = y;


interface Map {
  [s: string]: any;
}
let z: Map = { ok: 10 };