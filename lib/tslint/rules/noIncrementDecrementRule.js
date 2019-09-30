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
    Rule.POSTFIX_FAILURE_STRING = "Don't use '++' or '--' postfix operators outside statements or for loops.";
    Rule.PREFIX_FAILURE_STRING = "Don't use '++' or '--' prefix operators.";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node) {
        switch (node.kind) {
            case ts.SyntaxKind.PrefixUnaryExpression:
                var operator = node.operator;
                if (operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken) {
                    check(node);
                }
                break;
            case ts.SyntaxKind.PostfixUnaryExpression:
                check(node);
                break;
        }
    }
    function check(node) {
        if (!isAllowedLocation(node.parent)) {
            ctx.addFailureAtNode(node, Rule.POSTFIX_FAILURE_STRING);
        }
    }
}
function isAllowedLocation(node) {
    switch (node.kind) {
        // Can be a statement
        case ts.SyntaxKind.ExpressionStatement:
            return true;
        // Can be directly in a for-statement
        case ts.SyntaxKind.ForStatement:
            return true;
        // Can be in a comma operator in a for statement (`for (let a = 0, b = 10; a < b; a++, b--)`)
        case ts.SyntaxKind.BinaryExpression:
            return node.operatorToken.kind === ts.SyntaxKind.CommaToken &&
                node.parent.kind === ts.SyntaxKind.ForStatement;
        default:
            return false;
    }
}
