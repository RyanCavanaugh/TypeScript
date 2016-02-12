//@filename: decl.d.ts
interface Foo {
  x: number;
  y: string;
}

//@filename: test1.ts
class X {
	export implements Foo;
}

//@filename: test2.ts
interface Y {
	export implements Foo;
}

//@filename: test3.ts
module M {
	public export implements Foo;
}

//@filename: test4.ts
function fn() {
	export implements Foo;
}

//@filename: test5.ts
module M {
	function fn() {
		export implements Foo;
	}	
}

//@filename: test6.ts
module M {
	if (true) {
		export implements Foo;
	}
}
