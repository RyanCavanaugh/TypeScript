package module

import (
	"strings"
	"testing"
)

func TestPackageSubpathQuotes(t *testing.T) {
	t.Parallel()

	tests := []struct {
		subpath string
		skip    bool
	}{
		{subpath: ".", skip: false},
		{subpath: "./x", skip: false},
		{subpath: "./x/y", skip: false},
		{subpath: "./*", skip: false},
		{subpath: "./x/*", skip: false},
		{subpath: `./x\").Foo} */;console.log('SYNTHETIC_PACKAGE_MARKER');/(`, skip: true},
		{subpath: `./x"`, skip: true},
		{subpath: "./x'", skip: true},
	}

	for _, tt := range tests {
		t.Run(tt.subpath, func(t *testing.T) {
			if got := strings.ContainsAny(tt.subpath, `"'`); got != tt.skip {
				t.Errorf("strings.ContainsAny(%q, quotes) = %t, want %t", tt.subpath, got, tt.skip)
			}
		})
	}
}
