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
    var sourceFile = ctx.sourceFile;
    ts.forEachChild(sourceFile, function recur(node) {
        if (node.kind === ts.SyntaxKind.CallExpression) {
            checkCall(node);
        }
        ts.forEachChild(node, recur);
    });
    function checkCall(node) {
        if (!shouldIgnoreCalledExpression(node.expression)) {
            for (var _i = 0, _a = node.arguments; _i < _a.length; _i++) {
                var arg = _a[_i];
                checkArg(arg);
            }
        }
    }
    /** Skip certain function/method names whose parameter names are not informative. */
    function shouldIgnoreCalledExpression(expression) {
        if (expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            var methodName = expression.name.text;
            if (methodName.startsWith("set") || methodName.startsWith("assert")) {
                return true;
            }
            switch (methodName) {
                case "apply":
                case "call":
                case "equal":
                case "fail":
                case "isTrue":
                case "output":
                case "stringify":
                    return true;
            }
        }
        else if (expression.kind === ts.SyntaxKind.Identifier) {
            var functionName = expression.text;
            if (functionName.startsWith("set") || functionName.startsWith("assert")) {
                return true;
            }
            switch (functionName) {
                case "contains":
                case "createAnonymousType":
                case "createImportSpecifier":
                case "createProperty":
                case "createSignature":
                case "resolveName":
                    return true;
            }
        }
        return false;
    }
    function checkArg(arg) {
        if (!isTrivia(arg)) {
            return;
        }
        var ranges = ts.getTrailingCommentRanges(sourceFile.text, arg.pos) || ts.getLeadingCommentRanges(sourceFile.text, arg.pos);
        if (ranges === undefined || ranges.length !== 1 || ranges[0].kind !== ts.SyntaxKind.MultiLineCommentTrivia) {
            ctx.addFailureAtNode(arg, "Tag argument with parameter name");
            return;
        }
        var range = ranges[0];
        var argStart = arg.getStart(sourceFile);
        if (range.end + 1 !== argStart && sourceFile.text.slice(range.end, argStart).indexOf("\n") === -1) {
            ctx.addFailureAtNode(arg, "There should be 1 space between an argument and its comment.");
        }
    }
    function isTrivia(arg) {
        switch (arg.kind) {
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NullKeyword:
                return true;
            case ts.SyntaxKind.Identifier:
                return arg.originalKeywordKind === ts.SyntaxKind.UndefinedKeyword;
            default:
                return false;
        }
    }
}
