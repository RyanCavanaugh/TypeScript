//// [unknownAnyCatch.ts]
try {

} catch (a) {
  // should be OK
  a.isAny;
}

try {

} catch (a: any) {
  // should be OK
  a.isAny;
}

try {

} catch (a: unknown) {
  // Should be error
  a.isAny;
}

try {

} catch (a: object) {
         // Should be error
}


//// [unknownAnyCatch.js]
try {
}
catch (a) {
    // should be OK
    a.isAny;
}
try {
}
catch (a) {
    // should be OK
    a.isAny;
}
try {
}
catch (a) {
    // Should be error
    a.isAny;
}
try {
}
catch (a) {
    // Should be error
}
