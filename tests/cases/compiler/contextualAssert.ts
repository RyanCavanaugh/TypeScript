class Animal { a: string; }
class Dog extends Animal { woof: number; }
class Cat extends Animal { meow: boolean; }

declare function getAnimalByName(n: string): Animal;

var c: Cat = <?>getAnimalByName('kitty');
