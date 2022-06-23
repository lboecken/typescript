"use strict";
let john = { id: 0, name: 'john', grade: 80 };
let mary = { id: 1, name: 'mary', grade: 79 };
let sue = { id: 2, name: 'sue', grade: 67 };
let grades = [john, mary, sue];
function generic(x) {
    return x;
}
generic('hello');
