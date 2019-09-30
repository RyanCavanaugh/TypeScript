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
        return this.applyWithFunction(sourceFile, function (ctx) { return walk(ctx); });
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    ts.forEachChild(ctx.sourceFile, function recur(node) {
        if (ts.isCallExpression(node)) {
            checkCall(node);
        }
        ts.forEachChild(node, recur);
    });
    function checkCall(node) {
        if (!isDebugAssert(node.expression) || node.arguments.length < 2) {
            return;
        }
        var message = node.arguments[1];
        if (!ts.isStringLiteral(message)) {
            ctx.addFailureAtNode(message, "Second argument to 'Debug.assert' should be a string literal.");
        }
        if (node.arguments.length < 3) {
            return;
        }
        var message2 = node.arguments[2];
        if (!ts.isStringLiteral(message2) && !ts.isArrowFunction(message2)) {
            ctx.addFailureAtNode(message, "Third argument to 'Debug.assert' should be a string literal or arrow function.");
        }
    }
    function isDebugAssert(expr) {
        return ts.isPropertyAccessExpression(expr) && isName(expr.expression, "Debug") && isName(expr.name, "assert");
    }
    function isName(expr, text) {
        return ts.isIdentifier(expr) && expr.text === text;
    }
}
