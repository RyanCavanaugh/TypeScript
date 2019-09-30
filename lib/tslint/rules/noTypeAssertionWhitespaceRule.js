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
    Rule.TRAILING_FAILURE_STRING = "Excess trailing whitespace found around type assertion.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node) {
        if (node.kind === ts.SyntaxKind.TypeAssertionExpression) {
            var refined = node;
            var leftSideWhitespaceStart = refined.type.getEnd() + 1;
            var rightSideWhitespaceEnd = refined.expression.getStart();
            if (leftSideWhitespaceStart !== rightSideWhitespaceEnd) {
                ctx.addFailure(leftSideWhitespaceStart, rightSideWhitespaceEnd, Rule.TRAILING_FAILURE_STRING);
            }
        }
        ts.forEachChild(node, recur);
    }
}
