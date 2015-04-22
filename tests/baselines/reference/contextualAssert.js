//// [contextualAssert.ts]
class Animal { a: string; }
class Dog extends Animal { woof: number; }
class Cat extends Animal { meow: boolean; }

declare function getAnimalByName(n: string): Animal;

var c: Cat = <?>getAnimalByName('kitty');

<?>c;


//// [contextualAssert.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animal = (function () {
    function Animal() {
    }
    return Animal;
})();
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        _super.apply(this, arguments);
    }
    return Dog;
})(Animal);
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        _super.apply(this, arguments);
    }
    return Cat;
})(Animal);
var c = getAnimalByName('kitty');
c;
