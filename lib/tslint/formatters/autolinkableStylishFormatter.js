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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var Lint = require("tslint");
var chalk_1 = require("chalk");
var path_1 = require("path");
function groupBy(array, getGroupId) {
    if (!array) {
        return [];
    }
    var groupIdToGroup = {};
    var result; // Compacted array for return value
    for (var index = 0; index < array.length; index++) {
        var value = array[index];
        var key = getGroupId(value, index);
        if (groupIdToGroup[key]) {
            groupIdToGroup[key].push(value);
        }
        else {
            var newGroup = [value];
            groupIdToGroup[key] = newGroup;
            if (!result) {
                result = [newGroup];
            }
            else {
                result.push(newGroup);
            }
        }
    }
    return result || [];
}
function max(array, selector) {
    if (!array) {
        return 0;
    }
    var max = 0;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        var scalar = selector(item);
        if (scalar > max) {
            max = scalar;
        }
    }
    return max;
}
function getLink(failure, color) {
    var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
    var sev = failure.getRuleSeverity().toUpperCase();
    var path = failure.getFileName();
    // Most autolinks only become clickable if they contain a slash in some way; so we make a top level file into a relative path here
    if (path.indexOf("/") === -1 && path.indexOf("\\") === -1) {
        path = "." + path_1.sep + path;
    }
    return (color ? (sev === "WARNING" ? chalk_1["default"].blue(sev) : chalk_1["default"].red(sev)) : sev) + ": " + path + ":" + (lineAndCharacter.line + 1) + ":" + (lineAndCharacter.character + 1);
}
function getLinkMaxSize(failures) {
    return max(failures, function (f) { return getLink(f, /*color*/ false).length; });
}
function getNameMaxSize(failures) {
    return max(failures, function (f) { return f.getRuleName().length; });
}
function pad(str, visiblelen, len) {
    if (visiblelen >= len)
        return str;
    var count = len - visiblelen;
    for (var i = 0; i < count; i++) {
        str += " ";
    }
    return str;
}
var Formatter = /** @class */ (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Formatter.prototype.format = function (failures) {
        return groupBy(failures, function (f) { return f.getFileName(); }).map(function (group) {
            var currentFile = group[0].getFileName();
            var linkMaxSize = getLinkMaxSize(group);
            var nameMaxSize = getNameMaxSize(group);
            return "\n" + currentFile + "\n" + group.map(function (f) { return pad(getLink(f, /*color*/ true), getLink(f, /*color*/ false).length, linkMaxSize) + " " + chalk_1["default"].grey(pad(f.getRuleName(), f.getRuleName().length, nameMaxSize)) + " " + chalk_1["default"].yellow(f.getFailure()); }).join("\n");
        }).join("\n");
    };
    Formatter.metadata = {
        formatterName: "autolinkableStylish",
        description: "Human-readable formatter which creates stylish messages with autolinkable filepaths.",
        descriptionDetails: Lint.Utils.dedent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            Colorized output grouped by file, with autolinkable filepaths containing line and column information\n        "], ["\n            Colorized output grouped by file, with autolinkable filepaths containing line and column information\n        "]))),
        sample: Lint.Utils.dedent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        src/myFile.ts\n        ERROR: src/myFile.ts:1:14 semicolon Missing semicolon"], ["\n        src/myFile.ts\n        ERROR: src/myFile.ts:1:14 semicolon Missing semicolon"]))),
        consumer: "human"
    };
    return Formatter;
}(Lint.Formatters.AbstractFormatter));
exports.Formatter = Formatter;
var templateObject_1, templateObject_2;
