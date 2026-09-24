package module

import "testing"

func TestIsLegalPackageSubpath(t *testing.T) {
	t.Parallel()

	tests := []struct {
		subpath string
		legal   bool
	}{
		{subpath: ".", legal: true},
		{subpath: "./x", legal: true},
		{subpath: "./x/y", legal: true},
		{subpath: "./*", legal: true},
		{subpath: "./x/*", legal: true},
		{subpath: `./x\").Foo} */;console.log('SYNTHETIC_PACKAGE_MARKER');/(`, legal: false},
		{subpath: "./.", legal: false},
		{subpath: "./..", legal: false},
		{subpath: "./node_modules/x", legal: false},
		{subpath: "./x//y", legal: false},
	}

	for _, tt := range tests {
		t.Run(tt.subpath, func(t *testing.T) {
			if got := isLegalPackageSubpath(tt.subpath); got != tt.legal {
				t.Errorf("isLegalPackageSubpath(%q) = %t, want %t", tt.subpath, got, tt.legal)
			}
		})
	}
}
