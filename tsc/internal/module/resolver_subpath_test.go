package module_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

func TestGetEntrypointsFromPackageJsonInfoSkipsQuotedSubpaths(t *testing.T) {
	t.Parallel()

	const packageJSON = `{
		"exports": {
			"./x\\\").Foo} */;console.log('SYNTHETIC_PACKAGE_MARKER');/(": "./index.d.ts",
			"./x": "./index.d.ts"
		}
	}`
	contents, err := packagejson.Parse([]byte(packageJSON))
	if err != nil {
		t.Fatal(err)
	}

	fs := vfstest.FromMap(map[string]string{
		"/repo/node_modules/pkg/index.d.ts": "export declare const Foo: string;",
	}, true)
	host := &resolutionHostStub{fs: fs, cwd: "/repo"}
	resolver := module.NewResolver(
		host,
		&core.CompilerOptions{
			ModuleResolution: core.ModuleResolutionKindBundler,
			Module:           core.ModuleKindESNext,
			Target:           core.ScriptTargetESNext,
		},
		"",
		"",
		nil,
	)

	entrypoints := resolver.GetEntrypointsFromPackageJsonInfo(
		&packagejson.InfoCacheEntry{
			PackageDirectory: "/repo/node_modules/pkg",
			DirectoryExists:  true,
			Contents:         &packagejson.PackageJson{Fields: contents},
		},
		"pkg",
		false,
	)

	if len(entrypoints) != 1 {
		t.Fatalf("got %d entrypoints, want 1", len(entrypoints))
	}
	if got := entrypoints[0].ModuleSpecifier; got != "pkg/x" {
		t.Fatalf("got module specifier %q, want %q", got, "pkg/x")
	}
}
