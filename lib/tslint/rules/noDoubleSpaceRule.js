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
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function walk(ctx) {
    var sourceFile = ctx.sourceFile;
    var lines = sourceFile.text.split("\n");
    var strings = getLiterals(sourceFile);
    lines.forEach(function (line, idx) {
        // Skip indentation.
        var firstNonSpace = /\S/.exec(line);
        if (firstNonSpace === null) {
            return;
        }
        // Allow common uses of double spaces
        // * To align `=` or `!=` signs
        // * To align comments at the end of lines
        // * To indent inside a comment
        // * To use two spaces after a period
        // * To include aligned `->` in a comment
        var rgx = /[^/*. ]  [^-!/= ]/g;
        rgx.lastIndex = firstNonSpace.index;
        var doubleSpace = rgx.exec(line);
        // Also allow to align comments after `@param`
        if (doubleSpace !== null && !line.includes("@param")) {
            var pos_1 = lines.slice(0, idx).reduce(function (len, line) { return len + 1 + line.length; }, 0) + doubleSpace.index;
            if (!strings.some(function (s) { return s.getStart() <= pos_1 && s.end > pos_1; })) {
                ctx.addFailureAt(pos_1 + 1, 2, "Use only one space.");
            }
        }
    });
}
function getLiterals(sourceFile) {
    var out = [];
    sourceFile.forEachChild(function cb(node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.TemplateHead:
            case ts.SyntaxKind.TemplateMiddle:
            case ts.SyntaxKind.TemplateTail:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.RegularExpressionLiteral:
                out.push(node);
        }
        node.forEachChild(cb);
    });
    return out;
}
