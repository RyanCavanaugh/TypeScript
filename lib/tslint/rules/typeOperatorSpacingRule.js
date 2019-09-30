"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint/lib");
var ts = require("typescript");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    };
    Rule.FAILURE_STRING = "The '|' and '&' operators must be surrounded by spaces";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    sourceFile.forEachChild(function cb(node) {
        if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
            check(node);
        }
        node.forEachChild(cb);
    });
    function check(node) {
        var list = node.getChildren().find(function (child) { return child.kind === ts.SyntaxKind.SyntaxList; });
        for (var _i = 0, _a = list.getChildren(); _i < _a.length; _i++) {
            var child = _a[_i];
            if ((child.kind === ts.SyntaxKind.BarToken || child.kind === ts.SyntaxKind.AmpersandToken)
                && (/\S/.test(sourceFile.text[child.getStart(sourceFile) - 1]) || /\S/.test(sourceFile.text[child.end]))) {
                ctx.addFailureAtNode(child, Rule.FAILURE_STRING);
            }
        }
    }
}
