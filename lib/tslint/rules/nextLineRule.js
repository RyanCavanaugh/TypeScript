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
var OPTION_CATCH = "check-catch";
var OPTION_ELSE = "check-else";
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var options = this.getOptions().ruleArguments;
        var checkCatch = options.indexOf(OPTION_CATCH) !== -1;
        var checkElse = options.indexOf(OPTION_ELSE) !== -1;
        return this.applyWithFunction(sourceFile, function (ctx) { return walk(ctx, checkCatch, checkElse); });
    };
    Rule.CATCH_FAILURE_STRING = "'catch' should not be on the same line as the preceeding block's curly brace";
    Rule.ELSE_FAILURE_STRING = "'else' should not be on the same line as the preceeding block's curly brace";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx, checkCatch, checkElse) {
    var sourceFile = ctx.sourceFile;
    ts.forEachChild(sourceFile, function recur(node) {
        switch (node.kind) {
            case ts.SyntaxKind.IfStatement:
                checkIf(node);
                break;
            case ts.SyntaxKind.TryStatement:
                checkTry(node);
                break;
        }
        ts.forEachChild(node, recur);
    });
    function checkIf(node) {
        var thenStatement = node.thenStatement, elseStatement = node.elseStatement;
        if (!elseStatement) {
            return;
        }
        // find the else keyword
        var elseKeyword = getFirstChildOfKind(node, ts.SyntaxKind.ElseKeyword);
        if (checkElse && !!elseKeyword) {
            var thenStatementEndLoc = sourceFile.getLineAndCharacterOfPosition(thenStatement.getEnd());
            var elseKeywordLoc = sourceFile.getLineAndCharacterOfPosition(elseKeyword.getStart(sourceFile));
            if (thenStatementEndLoc.line === elseKeywordLoc.line) {
                ctx.addFailureAtNode(elseKeyword, Rule.ELSE_FAILURE_STRING);
            }
        }
    }
    function checkTry(_a) {
        var tryBlock = _a.tryBlock, catchClause = _a.catchClause;
        if (!checkCatch || !catchClause) {
            return;
        }
        var tryClosingBrace = tryBlock.getLastToken(sourceFile);
        var catchKeyword = catchClause.getFirstToken(sourceFile);
        var tryClosingBraceLoc = sourceFile.getLineAndCharacterOfPosition(tryClosingBrace.getEnd());
        var catchKeywordLoc = sourceFile.getLineAndCharacterOfPosition(catchKeyword.getStart(sourceFile));
        if (tryClosingBraceLoc.line === catchKeywordLoc.line) {
            ctx.addFailureAtNode(catchKeyword, Rule.CATCH_FAILURE_STRING);
        }
    }
}
function getFirstChildOfKind(node, kind) {
    return node.getChildren().filter(function (child) { return child.kind === kind; })[0];
}
