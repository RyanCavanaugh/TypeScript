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
    Rule.LEADING_FAILURE_STRING = "No leading whitespace found on single-line object literal.";
    Rule.TRAILING_FAILURE_STRING = "No trailing whitespace found on single-line object literal.";
    Rule.LEADING_EXCESS_FAILURE_STRING = "Excess leading whitespace found on single-line object literal.";
    Rule.TRAILING_EXCESS_FAILURE_STRING = "Excess trailing whitespace found on single-line object literal.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    ts.forEachChild(sourceFile, recur);
    function recur(node) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            check(node);
        }
        ts.forEachChild(node, recur);
    }
    function check(node) {
        var text = node.getText(sourceFile);
        if (!text.match(/^{[^\n]+}$/g)) {
            return;
        }
        if (text.charAt(1) !== " ") {
            ctx.addFailureAtNode(node, Rule.LEADING_FAILURE_STRING);
        }
        if (text.charAt(2) === " ") {
            ctx.addFailureAt(node.pos + 2, 1, Rule.LEADING_EXCESS_FAILURE_STRING);
        }
        if (text.charAt(text.length - 2) !== " ") {
            ctx.addFailureAtNode(node, Rule.TRAILING_FAILURE_STRING);
        }
        if (text.charAt(text.length - 3) === " ") {
            ctx.addFailureAt(node.pos + node.getWidth() - 3, 1, Rule.TRAILING_EXCESS_FAILURE_STRING);
        }
    }
}
