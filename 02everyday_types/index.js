"use strict";
// primitives
const string = 'hello world';
// contains floats & ints
const num = 3;
// boolean
const bool = true;
// ARRAYS
const nums = [1, 2, 3, 4];
const nums2 = [1, 2, 3, 4];
const strings = ['f', 'o', 'x'];
// Special 'any' type
let any = 'string';
any = 2;
any = () => {
    return true;
};
// strictness flag 'noImplicitAny' disallows 'any' if it is not explicitly defined &
// typescript cannot infer the type from context.
// 'a' is of type 'any' implicitly, so typescript throws an error.q
function anImplicityAny(a) {
    return a;
}
// function type annotations
// number of arguments is automatically checked.
// return type is also inferred so not always needed (but used for preference, clarity)
function greet(str) {
    return `hello ${str}`;
}
// this is fine
greet('john');
// this is not
greet(42);
// contextual typing is used for arrow functions
//  toUpperCase is available because TS knows the values of 'names'
const names = ['john', 'mary', 'susan'];
names.map((s) => {
    return s.toUpperCase();
});
function printPointer(pt) {
    for (const [key, value] of Object.entries(pt)) {
        console.log(`${key} is equal to ${value}`);
    }
}
// works fine because 'z' is optional
printPointer({ y: 4, x: 5 });
// does not work because x is not optional
printPointer({ y: 4, z: 5 });
// This results in requiring to check if an optional property is null before using it.
function optionalPropertyChecker(x, y) {
    console.log(x);
    y?.toExponential(4);
    //   OR
    if (y) {
        y.toExponential(4);
    }
}
// Unions
// Narrowest available methods only.
function printID(id) {
    console.log(id);
    // not available due to toUpperCase is only available to strings
    id.toUpperCase();
    //   Also works the other way...toExponential is only avaiable on numbers
    id.toExponential();
    //   But this works since both number and string have this
    id.toLocaleString();
}
function printPointer2(pt) {
    console.log(pt.x);
    console.log(pt.y);
    //   Typescript knows this property does not exist
    pt.print();
}
// Not creating a type simply allows TS to compare the structure of the data.
// Not the 'type' metadata, cause it does not exist.
// Hence this function call is valid
printPointer2({ x: 3, y: 5 });
function printPointer3(pt) {
    console.log(pt.y);
    console.log(pt.x);
}
// type assertion
// convert from more specific to less specific and vice versa
const input = document.querySelector('.inputform');
// since its a matter of specificity, the below does not work due to lack of overlap
const aString = 'number';
// this works because we convert to 'any' first. This would result in NaN
const aString2 = 'number';
// literals
// Sometimes an exact value can be cast as the type. This happens when using const
// Since it cannot be reassgined
// aLiteral has a type of 'hello world' since it cannot represent anything else.
const aLiteral = 'hello world';
// This is useful with unions.
function setPadding(padding) {
    console.log(padding);
}
setPadding('left');
// not valid due to literal typing being set to 'left', 'right' or 'center'
setPadding(24);
// this works with numbers as well
function setBase(base) {
    console.log(base);
}
setBase(10);
setBase('left');
function setConfig(x) {
    console.log(x);
}
function handleRequest(url, method) { }
// as "POST" can be added either on the object or on the function call
const req = { method: 'POST', url: 'localhost:3000' };
handleRequest(req.url, req.method);
// Another option is to create the object with type literals
const req2 = { method: 'POST', url: 'localhost' };
handleRequest(req2.url, req2.method);
function handleRequest2(req) { }
// Accepts anything that conforms to the ReqInter, which req does.
handleRequest2(req);
//  ! Operator (Non null assertation)
// Tells Typescript you know this function cannot be called with null
function dangerous(x) {
    console.log(x.toExponential());
}
dangerous();
// This throws no errors and does NOT change runtime behavior, only what typescript is
// checking. So only turn off if you really need to .
