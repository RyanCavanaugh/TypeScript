//// [strictInterfaceParsing.ts]
namespace A {
	let strict = 0;
}
namespace A {
	var strict = 1;
}
namespace A {
	class strict {
	}
}
namespace strict {

}

namespace A {
	interface strict {

	}

	strict interface strict {
		
	}
}

//// [strictInterfaceParsing.js]
var A;
(function (A) {
    var strict = 0;
})(A || (A = {}));
var A;
(function (A) {
    var strict = 1;
})(A || (A = {}));
var A;
(function (A) {
    var strict = (function () {
        function strict() {
        }
        return strict;
    })();
})(A || (A = {}));
