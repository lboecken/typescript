"use strict";
let message = 'hello WORLD';
// toLowerCase is inferred from the definiton.
message.toLowerCase();
// However if we attempt to call message it fails
message();
// This also fails because we already assigned 'message' to be a string
message = () => console.log('hello world');
// Now however due to the 'any' type, we can reassign it into a function
let message2 = 'hello world';
message2 = () => console.log('hello world!');
message2();
// Typo on method call
message.toLocaleLowerCase();
message.toLocalLowerCase();
// Uncalled methods
if (Math.random > 0.5) {
    console.log('this does not work');
}
// Unreachable logic....
const value = 'a';
if (value !== 'a') {
    console.log('do stuff');
}
else if (value === 'b') {
    console.log('unreachable');
}
// strictNullChecks:
// Dumps 'null' and 'undefined' into separate buckets as a type
// Previously each existed in each set of primitives (number, string, boolean, etc)
